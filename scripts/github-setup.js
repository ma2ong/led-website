#!/usr/bin/env node

/**
 * GitHub仓库设置自动化脚本
 * 帮助用户快速设置Git仓库并推送到GitHub
 */

const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function executeCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log(`✅ ${description}完成`);
    return result;
  } catch (error) {
    console.log(`❌ ${description}失败: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 GitHub仓库设置助手\n');
  
  // 检查Git是否已安装
  const gitVersion = executeCommand('git --version', '检查Git版本');
  if (!gitVersion) {
    console.log('❌ 请先安装Git: https://git-scm.com/download/win');
    process.exit(1);
  }
  
  // 检查是否已经是Git仓库
  const isGitRepo = fs.existsSync('.git');
  if (!isGitRepo) {
    executeCommand('git init', '初始化Git仓库');
  } else {
    console.log('✅ Git仓库已存在');
  }
  
  // 获取用户信息
  console.log('\n📝 配置Git用户信息:');
  const userName = await question('请输入您的姓名: ');
  const userEmail = await question('请输入您的邮箱: ');
  
  executeCommand(`git config --global user.name "${userName}"`, '设置用户名');
  executeCommand(`git config --global user.email "${userEmail}"`, '设置邮箱');
  
  // 获取GitHub仓库信息
  console.log('\n🔗 GitHub仓库信息:');
  const githubUsername = await question('请输入您的GitHub用户名: ');
  const repoName = await question('请输入仓库名称 (默认: lianjin-led-website): ') || 'lianjin-led-website';
  
  const repoUrl = `https://github.com/${githubUsername}/${repoName}.git`;
  console.log(`\n📍 仓库地址: ${repoUrl}`);
  
  // 创建.gitignore文件
  const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
.next/
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# Strapi
backend/.tmp/
backend/build/
backend/.strapi-updater.json
`;

  if (!fs.existsSync('.gitignore')) {
    fs.writeFileSync('.gitignore', gitignoreContent);
    console.log('✅ 创建.gitignore文件');
  }
  
  // 添加文件到Git
  executeCommand('git add .', '添加所有文件到Git');
  
  // 检查是否有文件需要提交
  const status = executeCommand('git status --porcelain', '检查Git状态');
  if (status && status.trim()) {
    executeCommand('git commit -m "Initial commit: LED website project ready for deployment"', '提交代码');
  } else {
    console.log('✅ 没有新的更改需要提交');
  }
  
  // 设置远程仓库
  const remoteExists = executeCommand('git remote get-url origin', '检查远程仓库');
  if (!remoteExists) {
    executeCommand(`git remote add origin ${repoUrl}`, '添加远程仓库');
  } else {
    console.log('✅ 远程仓库已存在');
  }
  
  // 设置主分支
  executeCommand('git branch -M main', '设置主分支为main');
  
  console.log('\n🎯 准备推送到GitHub...');
  console.log('⚠️  注意: 如果这是第一次推送，您可能需要:');
  console.log('   1. 在GitHub上创建仓库 (如果还没创建)');
  console.log('   2. 使用Personal Access Token作为密码');
  console.log('   3. 或者配置SSH密钥');
  
  const shouldPush = await question('\n是否现在推送到GitHub? (y/n): ');
  
  if (shouldPush.toLowerCase() === 'y' || shouldPush.toLowerCase() === 'yes') {
    console.log('\n🚀 推送代码到GitHub...');
    console.log('如果提示输入密码，请使用Personal Access Token');
    
    const pushResult = executeCommand('git push -u origin main', '推送代码');
    
    if (pushResult !== null) {
      console.log('\n🎉 代码推送成功!');
      console.log(`📍 仓库地址: ${repoUrl}`);
      console.log('\n📋 下一步操作:');
      console.log('1. 访问您的GitHub仓库确认文件已上传');
      console.log('2. 继续进行Vercel部署');
      console.log('3. 查看部署指南: docs/vercel-deployment-guide.md');
    } else {
      console.log('\n❌ 推送失败，请检查:');
      console.log('1. GitHub仓库是否已创建');
      console.log('2. 用户名和密码/Token是否正确');
      console.log('3. 网络连接是否正常');
      console.log('\n💡 手动推送命令:');
      console.log(`git push -u origin main`);
    }
  } else {
    console.log('\n📋 手动推送步骤:');
    console.log('1. 在GitHub上创建仓库 (如果还没创建)');
    console.log('2. 运行命令: git push -u origin main');
    console.log('3. 输入GitHub用户名和Personal Access Token');
  }
  
  console.log('\n📚 相关文档:');
  console.log('• GitHub设置指南: docs/github-setup-guide.md');
  console.log('• Vercel部署指南: docs/vercel-deployment-guide.md');
  console.log('• 部署检查清单: docs/vercel-deployment-checklist.md');
  
  rl.close();
}

main().catch(error => {
  console.error('❌ 脚本执行出错:', error.message);
  rl.close();
  process.exit(1);
});