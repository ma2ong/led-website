#!/usr/bin/env node

/**
 * 数据库备份脚本
 * 支持PostgreSQL数据库的自动备份
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

// 配置
const CONFIG = {
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  },
  backup: {
    directory: './backups',
    s3Bucket: process.env.BACKUP_S3_BUCKET,
    retention: 30 // 保留30天的备份
  }
};

// 初始化AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.BACKUP_S3_ACCESS_KEY,
  secretAccessKey: process.env.BACKUP_S3_SECRET_KEY,
  region: process.env.BACKUP_S3_REGION || 'us-east-1'
});

function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
}

function createBackupDirectory() {
  if (!fs.existsSync(CONFIG.backup.directory)) {
    fs.mkdirSync(CONFIG.backup.directory, { recursive: true });
    log(`创建备份目录: ${CONFIG.backup.directory}`);
  }
}

function generateBackupFilename() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${CONFIG.database.name}-backup-${timestamp}.sql`;
}

function createDatabaseBackup() {
  log('开始创建数据库备份...');
  
  const filename = generateBackupFilename();
  const filepath = path.join(CONFIG.backup.directory, filename);
  
  // 设置PGPASSWORD环境变量
  process.env.PGPASSWORD = CONFIG.database.password;
  
  const command = `pg_dump -h ${CONFIG.database.host} -p ${CONFIG.database.port} -U ${CONFIG.database.username} -d ${CONFIG.database.name} -f ${filepath} --verbose --no-password`;
  
  try {
    execSync(command, { stdio: 'inherit' });
    log(`数据库备份创建成功: ${filepath}`);
    return filepath;
  } catch (error) {
    log(`数据库备份失败: ${error.message}`, 'error');
    throw error;
  } finally {
    // 清除密码环境变量
    delete process.env.PGPASSWORD;
  }
}

async function uploadToS3(filepath) {
  if (!CONFIG.backup.s3Bucket) {
    log('未配置S3存储桶，跳过上传');
    return;
  }

  log('上传备份到S3...');
  
  const filename = path.basename(filepath);
  const fileContent = fs.readFileSync(filepath);
  
  const params = {
    Bucket: CONFIG.backup.s3Bucket,
    Key: `database-backups/${filename}`,
    Body: fileContent,
    ContentType: 'application/sql',
    ServerSideEncryption: 'AES256',
    Metadata: {
      'backup-date': new Date().toISOString(),
      'database-name': CONFIG.database.name,
      'backup-type': 'full'
    }
  };

  try {
    const result = await s3.upload(params).promise();
    log(`备份上传成功: ${result.Location}`);
    return result.Location;
  } catch (error) {
    log(`S3上传失败: ${error.message}`, 'error');
    throw error;
  }
}

function compressBackup(filepath) {
  log('压缩备份文件...');
  
  const compressedPath = `${filepath}.gz`;
  const command = `gzip ${filepath}`;
  
  try {
    execSync(command);
    log(`备份压缩成功: ${compressedPath}`);
    return compressedPath;
  } catch (error) {
    log(`备份压缩失败: ${error.message}`, 'error');
    throw error;
  }
}

function cleanupOldBackups() {
  log('清理旧备份文件...');
  
  const files = fs.readdirSync(CONFIG.backup.directory);
  const backupFiles = files.filter(file => file.includes('backup-') && file.endsWith('.sql.gz'));
  
  // 按修改时间排序
  const sortedFiles = backupFiles.map(file => {
    const filepath = path.join(CONFIG.backup.directory, file);
    const stats = fs.statSync(filepath);
    return { file, filepath, mtime: stats.mtime };
  }).sort((a, b) => b.mtime - a.mtime);

  // 删除超过保留期的文件
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - CONFIG.backup.retention);

  let deletedCount = 0;
  sortedFiles.forEach(({ file, filepath, mtime }) => {
    if (mtime < cutoffDate) {
      fs.unlinkSync(filepath);
      log(`删除旧备份: ${file}`);
      deletedCount++;
    }
  });

  log(`清理完成，删除了 ${deletedCount} 个旧备份文件`);
}

async function cleanupOldS3Backups() {
  if (!CONFIG.backup.s3Bucket) {
    return;
  }

  log('清理S3中的旧备份...');
  
  try {
    const params = {
      Bucket: CONFIG.backup.s3Bucket,
      Prefix: 'database-backups/'
    };

    const objects = await s3.listObjectsV2(params).promise();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - CONFIG.backup.retention);

    const objectsToDelete = objects.Contents.filter(obj => 
      new Date(obj.LastModified) < cutoffDate
    );

    if (objectsToDelete.length > 0) {
      const deleteParams = {
        Bucket: CONFIG.backup.s3Bucket,
        Delete: {
          Objects: objectsToDelete.map(obj => ({ Key: obj.Key }))
        }
      };

      await s3.deleteObjects(deleteParams).promise();
      log(`从S3删除了 ${objectsToDelete.length} 个旧备份文件`);
    }
  } catch (error) {
    log(`S3清理失败: ${error.message}`, 'error');
  }
}

function validateBackup(filepath) {
  log('验证备份文件...');
  
  const stats = fs.statSync(filepath);
  if (stats.size === 0) {
    throw new Error('备份文件为空');
  }

  // 检查文件是否包含SQL内容
  const content = fs.readFileSync(filepath, 'utf8');
  if (!content.includes('PostgreSQL database dump')) {
    throw new Error('备份文件格式不正确');
  }

  log(`备份验证成功，文件大小: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

async function sendNotification(success, details) {
  // 这里可以集成邮件、Slack等通知服务
  const status = success ? '成功' : '失败';
  const message = `数据库备份${status}: ${details}`;
  
  log(`通知: ${message}`);
  
  // 示例：发送到Slack
  // await sendSlackNotification(message);
}

async function main() {
  try {
    log('开始数据库备份流程...');
    
    // 1. 创建备份目录
    createBackupDirectory();
    
    // 2. 创建数据库备份
    const backupPath = createDatabaseBackup();
    
    // 3. 验证备份
    validateBackup(backupPath);
    
    // 4. 压缩备份
    const compressedPath = compressBackup(backupPath);
    
    // 5. 上传到S3
    const s3Location = await uploadToS3(compressedPath);
    
    // 6. 清理旧备份
    cleanupOldBackups();
    await cleanupOldS3Backups();
    
    // 7. 发送成功通知
    await sendNotification(true, `备份已保存到: ${s3Location || compressedPath}`);
    
    log('数据库备份完成');
    
  } catch (error) {
    log(`备份失败: ${error.message}`, 'error');
    await sendNotification(false, error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  createDatabaseBackup,
  uploadToS3,
  cleanupOldBackups
};