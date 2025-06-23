#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    log(`命令执行失败: ${command}`, 'red');
    process.exit(1);
  }
}

// 检查是否在正确的目录
if (!fs.existsSync('package.json')) {
  log('错误: 请在 sso-icons 目录下运行此脚本', 'red');
  process.exit(1);
}

// 读取 package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const currentVersion = packageJson.version;

log(`当前版本: ${currentVersion}`, 'blue');

// 检查是否有未提交的更改
const gitStatus = exec('git status --porcelain', { encoding: 'utf8' });
if (gitStatus.trim()) {
  log('检查到未提交的更改，请先提交所有更改', 'yellow');
  process.exit(1);
}
log('Git 工作目录干净，继续发布流程', 'green');

// 构建项目
log('构建项目...', 'blue');
exec('pnpm build');

// 检查构建结果
if (!fs.existsSync('dist')) {
  log('错误: 构建失败，dist 目录不存在', 'red');
  process.exit(1);
}

// 检查 npm 登录状态
try {
  exec('npm whoami');
} catch (error) {
  log('请先登录 npm: npm login', 'yellow');
  process.exit(1);
}

// 检查包是否已存在
try {
  exec(`npm view ${packageJson.name} version`);
  log('包已存在，将发布新版本', 'yellow');
} catch (error) {
  log('首次发布包', 'green');
}

// 确认发布
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('确认发布到 npm? (y/N): ', (answer) => {
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    log('发布中...', 'blue');
    exec('npm publish --access public');
    log('发布成功!', 'green');
    
    // 创建 git tag
    log('创建 git tag...', 'blue');
    exec(`git tag v${currentVersion}`);
    exec(`git push origin v${currentVersion}`);
    log('Git tag 创建成功!', 'green');
  } else {
    log('发布已取消', 'yellow');
  }
  rl.close();
}); 