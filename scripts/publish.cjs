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

// 解析版本号
function parseVersion(version) {
  const parts = version.split('.').map(Number);
  return {
    major: parts[0],
    minor: parts[1],
    patch: parts[2]
  };
}

// 递增版本号
function bumpVersion(version, type = 'patch') {
  const { major, minor, patch } = parseVersion(version);
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
    default:
      return `${major}.${minor}.${patch + 1}`;
  }
}

// 更新 package.json 版本号
function updateVersion(newVersion) {
  const packagePath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageJson.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
  log(`版本号已更新为: ${newVersion}`, 'green');
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

// 获取版本升级类型
const versionType = process.argv[2] || 'patch';
if (!['patch', 'minor', 'major'].includes(versionType)) {
  log('错误: 版本类型必须是 patch、minor 或 major', 'red');
  process.exit(1);
}

// 计算新版本号
const newVersion = bumpVersion(currentVersion, versionType);
log(`将升级到版本: ${newVersion} (${versionType})`, 'blue');

// 更新版本号
updateVersion(newVersion);

// 检查是否有未提交的更改
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus.trim()) {
    log('检测到未提交的更改，自动提交中...', 'yellow');
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "chore: bump version to ${newVersion}"`, { stdio: 'inherit' });
    log('自动提交完成，继续发布流程', 'green');
  } else {
    log('Git 工作目录干净，继续发布流程', 'green');
  }
} catch (error) {
  log('Git 状态检查失败，继续发布流程', 'yellow');
}

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
let isFirstPublish = false;
try {
  execSync(`npm view ${packageJson.name} version`, { stdio: 'pipe' });
  log('包已存在，将发布新版本', 'yellow');
} catch (error) {
  // 404 视为首次发布
  if (error.status === 1 && error.stderr && error.stderr.toString().includes('404')) {
    log('首次发布包', 'green');
    isFirstPublish = true;
  } else {
    log('检查包是否已存在时发生未知错误', 'red');
    process.exit(1);
  }
}

// 确认发布
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`确认发布版本 ${newVersion} 到 npm? (y/N): `, (answer) => {
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    log('发布中...', 'blue');
    exec('npm publish --access public');
    log('发布成功!', 'green');
    
    // 创建 git tag
    log('创建 git tag...', 'blue');
    exec(`git tag v${newVersion}`);
    exec(`git push origin v${newVersion}`);
    log('Git tag 创建成功!', 'green');
  } else {
    log('发布已取消', 'yellow');
  }
  rl.close();
}); 