#!/usr/bin/env node

/**
 * Vercel部署故障排除脚本
 * 检查部署状态并提供解决方案
 */

const https = require('https');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
  githubRepo: 'ma2ong/led-website',
  vercelProjectName: 'led-website', // 根据实际项目名称调整
  frontendDir: 'frontend'
};

// 日志工具
const logger = {
  info: (message) => console.log(`ℹ️  ${message}`),
  success: (message) => console.log(`✅ ${message}`),
  warning: (message) => console.log(`⚠️  ${message}`),
  error: (message) => console.log(`❌ ${message}`),
  step: (message) => console.log(`\n🔧 ${message}`)
};

// 检查GitHub仓库状态
function checkGitHubStatus() {
  logger.step('检查GitHub仓库状态...');
  
  try {
    // 检查远程仓库连接
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    logger.success(`GitHub仓库: ${remoteUrl}`);
    
    // 检查最新提交
    const latestCommit = execSync('git log -1 --oneline', { encoding: 'utf8' }).trim();
    logger.success(`最新提交: ${latestCommit}`);
    
    // 检查分支状态
    const branchStatus = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    if (branchStatus === '') {
      logger.success('工作目录干净，所有更改已提交');
    } else {
      logger.warning('工作目录有未提交的更改');
      console.log(branchStatus);
    }
    
    // 检查是否与远程同步
    try {
      execSync('git fetch origin', { stdio: 'pipe' });
      const behind = execSync('git rev-list --count HEAD..origin/main', { encoding: 'utf8' }).trim();
      const ahead = execSync('git rev-list --count origin/main..HEAD', { encoding: 'utf8' }).trim();
      
      if (behind === '0' && ahead === '0') {
        logger.success('本地分支与远程分支同步');
      } else if (ahead > 0) {
        logger.warning(`本地分支领先远程 ${ahead} 个提交`);
      } else if (behind > 0) {
        logger.warning(`本地分支落后远程 ${behind} 个提交`);
      }
    } catch (error) {
      logger.warning('无法检查分支同步状态');
    }
    
    return true;
  } catch (error) {
    logger.error(`GitHub检查失败: ${error.message}`);
    return false;
  }
}

// 检查项目配置
function checkProjectConfig() {
  logger.step('检查项目配置...');
  
  const fs = require('fs');
  const path = require('path');
  
  // 检查关键文件
  const criticalFiles = [
    'frontend/package.json',
    'frontend/next.config.js',
    'vercel.json',
    'frontend/src/app/layout.tsx',
    'frontend/src/app/page.tsx'
  ];
  
  let allFilesExist = true;
  
  criticalFiles.forEach(file => {
    if (fs.existsSync(file)) {
      logger.success(`${file} 存在`);
    } else {
      logger.error(`${file} 缺失`);
      allFilesExist = false;
    }
  });
  
  // 检查package.json配置
  try {
    const packageJson = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
    
    if (packageJson.scripts && packageJson.scripts.build) {
      logger.success('build脚本已配置');
    } else {
      logger.error('缺少build脚本');
      allFilesExist = false;
    }
    
    if (packageJson.scripts && packageJson.scripts.start) {
      logger.success('start脚本已配置');
    } else {
      logger.error('缺少start脚本');
      allFilesExist = false;
    }
  } catch (error) {
    logger.error('无法读取package.json');
    allFilesExist = false;
  }
  
  // 检查vercel.json配置
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    
    if (vercelConfig.buildCommand) {
      logger.success(`构建命令: ${vercelConfig.buildCommand}`);
    }
    
    if (vercelConfig.outputDirectory) {
      logger.success(`输出目录: ${vercelConfig.outputDirectory}`);
    }
    
    if (vercelConfig.installCommand) {
      logger.success(`安装命令: ${vercelConfig.installCommand}`);
    }
  } catch (error) {
    logger.warning('vercel.json配置可能有问题');
  }
  
  return allFilesExist;
}

// 测试本地构建
function testLocalBuild() {
  logger.step('测试本地构建...');
  
  try {
    logger.info('开始本地构建测试...');
    
    // 切换到frontend目录并执行构建
    process.chdir('frontend');
    
    // 安装依赖
    logger.info('安装依赖...');
    execSync('npm install', { stdio: 'inherit' });
    
    // 执行构建
    logger.info('执行构建...');
    execSync('npm run build', { stdio: 'inherit' });
    
    logger.success('本地构建成功！');
    
    // 切换回根目录
    process.chdir('..');
    
    return true;
  } catch (error) {
    logger.error(`本地构建失败: ${error.message}`);
    
    // 切换回根目录
    try {
      process.chdir('..');
    } catch (e) {
      // 忽略错误
    }
    
    return false;
  }
}

// 提供解决方案
function provideSolutions() {
  logger.step('Vercel部署故障排除方案');
  
  console.log(`
🔧 可能的解决方案:

1. 检查Vercel项目设置:
   • 登录 https://vercel.com/dashboard
   • 找到你的项目 "${CONFIG.vercelProjectName}"
   • 检查Git集成是否正确连接到 ${CONFIG.githubRepo}
   • 确认分支设置为 "main"

2. 检查项目配置:
   • Root Directory: frontend
   • Build Command: npm run build
   • Output Directory: .next
   • Install Command: npm install

3. 手动触发部署:
   • 在Vercel Dashboard中点击 "Deployments" 标签
   • 点击 "Redeploy" 按钮
   • 或者点击 "Deploy" 创建新部署

4. 检查环境变量:
   • 确保在Vercel中配置了必要的环境变量
   • NEXT_PUBLIC_STRAPI_API_URL
   • NEXT_PUBLIC_SITE_URL
   • NODE_ENV=production

5. 检查构建日志:
   • 在Vercel Dashboard中查看最新的构建日志
   • 查找错误信息和失败原因

6. 强制重新部署:
   • 删除 .vercel 目录 (如果存在)
   • 重新连接项目到Vercel
   • 或者创建新的Vercel项目

7. 检查Webhook:
   • 在GitHub仓库设置中检查Webhooks
   • 确保Vercel的webhook正常工作
   • URL应该类似: https://api.vercel.com/v1/integrations/deploy/...

8. 联系方式:
   • Vercel支持: https://vercel.com/support
   • 社区论坛: https://github.com/vercel/vercel/discussions
  `);
}

// 创建部署触发器
function createDeploymentTrigger() {
  logger.step('创建部署触发器...');
  
  try {
    // 创建一个小的更改来触发部署
    const fs = require('fs');
    const deployTriggerFile = 'frontend/.vercel-deploy-trigger';
    const timestamp = new Date().toISOString();
    
    fs.writeFileSync(deployTriggerFile, `Deploy triggered at: ${timestamp}\n`);
    
    // 提交更改
    execSync('git add .');
    execSync(`git commit -m "deploy: 触发Vercel部署 - ${timestamp}"`);
    execSync('git push origin main');
    
    logger.success('部署触发器已创建并推送到GitHub');
    logger.info('Vercel应该会在几分钟内检测到更改并开始部署');
    
    return true;
  } catch (error) {
    logger.error(`创建部署触发器失败: ${error.message}`);
    return false;
  }
}

// 主函数
async function main() {
  console.log('🚀 Vercel部署故障排除开始...\n');
  
  // 检查GitHub状态
  const githubOk = checkGitHubStatus();
  
  // 检查项目配置
  const configOk = checkProjectConfig();
  
  // 如果基础检查通过，测试本地构建
  let buildOk = false;
  if (githubOk && configOk) {
    buildOk = testLocalBuild();
  }
  
  // 提供解决方案
  provideSolutions();
  
  // 如果一切正常，创建部署触发器
  if (githubOk && configOk && buildOk) {
    logger.step('所有检查通过，创建部署触发器...');
    createDeploymentTrigger();
  }
  
  console.log('\n📋 总结:');
  console.log(`GitHub状态: ${githubOk ? '✅' : '❌'}`);
  console.log(`项目配置: ${configOk ? '✅' : '❌'}`);
  console.log(`本地构建: ${buildOk ? '✅' : '❌'}`);
  
  if (githubOk && configOk && buildOk) {
    console.log('\n🎉 项目状态良好，部署触发器已创建！');
    console.log('请等待几分钟，然后检查Vercel Dashboard中的部署状态。');
  } else {
    console.log('\n⚠️  发现问题，请根据上述解决方案进行修复。');
  }
}

// 错误处理
process.on('unhandledRejection', (reason, promise) => {
  logger.error('未处理的Promise拒绝:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error('未捕获的异常:', error);
  process.exit(1);
});

// 运行主函数
if (require.main === module) {
  main().catch(error => {
    logger.error(`脚本执行失败: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { checkGitHubStatus, checkProjectConfig, testLocalBuild };