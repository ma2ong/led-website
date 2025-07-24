#!/usr/bin/env node

/**
 * Vercel部署前检查脚本
 * 自动检查项目是否准备好部署到Vercel
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Vercel部署前检查开始...\n');

const checks = [];
let hasErrors = false;

// 检查函数
function addCheck(name, condition, message, isError = true) {
  const status = condition ? '✅' : (isError ? '❌' : '⚠️');
  checks.push({ name, status, message, passed: condition, isError });
  if (!condition && isError) hasErrors = true;
}

// 1. 检查项目结构
console.log('📁 检查项目结构...');
addCheck(
  'Frontend目录',
  fs.existsSync('frontend'),
  'frontend目录存在'
);

addCheck(
  'Package.json',
  fs.existsSync('frontend/package.json'),
  'frontend/package.json存在'
);

addCheck(
  'Next.js配置',
  fs.existsSync('frontend/next.config.js'),
  'next.config.js存在'
);

addCheck(
  'Vercel配置',
  fs.existsSync('frontend/vercel.json'),
  'vercel.json配置文件存在'
);

// 2. 检查package.json配置
console.log('📦 检查package.json配置...');
try {
  const packageJson = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
  
  addCheck(
    'Build脚本',
    packageJson.scripts && packageJson.scripts.build,
    'build脚本已配置'
  );
  
  addCheck(
    'Start脚本',
    packageJson.scripts && packageJson.scripts.start,
    'start脚本已配置'
  );
  
  addCheck(
    'Next.js依赖',
    packageJson.dependencies && packageJson.dependencies.next,
    'Next.js依赖已安装'
  );
} catch (error) {
  addCheck('Package.json解析', false, 'package.json文件格式错误');
}

// 3. 检查Next.js配置
console.log('⚙️ 检查Next.js配置...');
try {
  const nextConfigPath = 'frontend/next.config.js';
  if (fs.existsSync(nextConfigPath)) {
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    addCheck(
      'Standalone输出',
      nextConfigContent.includes("output: 'standalone'"),
      '已配置standalone输出模式'
    );
    
    addCheck(
      '图片优化配置',
      nextConfigContent.includes('images:'),
      '已配置图片优化'
    );
  }
} catch (error) {
  addCheck('Next.js配置检查', false, 'next.config.js文件读取错误');
}

// 4. 检查环境变量模板
console.log('🔧 检查环境变量配置...');
addCheck(
  '环境变量模板',
  fs.existsSync('.env.production.example'),
  '环境变量模板文件存在'
);

// 5. 检查Git状态
console.log('📝 检查Git状态...');
addCheck(
  'Git仓库',
  fs.existsSync('.git'),
  'Git仓库已初始化'
);

// 6. 检查必要文件
console.log('📄 检查必要文件...');
const requiredFiles = [
  'frontend/src/app/layout.tsx',
  'frontend/src/app/page.tsx',
  'frontend/public/favicon.ico'
];

requiredFiles.forEach(file => {
  addCheck(
    path.basename(file),
    fs.existsSync(file),
    `${file} 存在`
  );
});

// 7. 检查TypeScript配置
console.log('🔷 检查TypeScript配置...');
addCheck(
  'TypeScript配置',
  fs.existsSync('frontend/tsconfig.json'),
  'tsconfig.json存在',
  false // 不是必需的，但推荐
);

// 输出检查结果
console.log('\n📊 检查结果汇总:');
console.log('='.repeat(50));

checks.forEach(check => {
  console.log(`${check.status} ${check.name}: ${check.message}`);
});

console.log('='.repeat(50));

// 统计
const passed = checks.filter(c => c.passed).length;
const total = checks.length;
const errors = checks.filter(c => !c.passed && c.isError).length;
const warnings = checks.filter(c => !c.passed && !c.isError).length;

console.log(`\n📈 统计: ${passed}/${total} 项检查通过`);
if (errors > 0) console.log(`❌ 错误: ${errors} 项`);
if (warnings > 0) console.log(`⚠️ 警告: ${warnings} 项`);

// 部署建议
console.log('\n💡 部署建议:');

if (hasErrors) {
  console.log('❌ 发现关键问题，请先解决以下问题再部署:');
  checks.filter(c => !c.passed && c.isError).forEach(check => {
    console.log(`   • ${check.message}`);
  });
} else {
  console.log('✅ 项目已准备好部署到Vercel!');
  console.log('\n🚀 下一步操作:');
  console.log('1. 确保代码已推送到GitHub');
  console.log('2. 在Vercel中导入项目');
  console.log('3. 设置Root Directory为 "frontend"');
  console.log('4. 配置环境变量');
  console.log('5. 点击Deploy按钮');
  
  console.log('\n📋 需要配置的环境变量:');
  console.log('• NEXT_PUBLIC_STRAPI_API_URL');
  console.log('• NEXT_PUBLIC_SITE_URL');
  console.log('• NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
  console.log('• NODE_ENV=production');
}

if (warnings > 0) {
  console.log('\n⚠️ 建议优化:');
  checks.filter(c => !c.passed && !c.isError).forEach(check => {
    console.log(`   • ${check.message}`);
  });
}

console.log('\n📚 更多帮助:');
console.log('• 详细部署指南: docs/vercel-deployment-guide.md');
console.log('• 部署检查清单: docs/vercel-deployment-checklist.md');
console.log('• Vercel官方文档: https://vercel.com/docs');

process.exit(hasErrors ? 1 : 0);