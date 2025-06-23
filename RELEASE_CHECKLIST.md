# 发布检查清单

## 📋 发布前检查

### 1. 包信息检查
- [ ] `package.json` 中的信息完整（name, version, description, author, license）
- [ ] `repository` 和 `homepage` 字段正确
- [ ] `keywords` 包含相关关键词
- [ ] `exports` 配置正确
- [ ] `files` 字段包含需要发布的文件

### 2. 代码质量检查
- [ ] 所有 TypeScript 错误已修复
- [ ] 构建成功 (`pnpm build`)
- [ ] `dist` 目录包含所有必要文件
- [ ] 类型声明文件正确生成

### 3. 文档检查
- [ ] `README.md` 内容完整
- [ ] 安装和使用说明清晰
- [ ] API 文档完整
- [ ] 示例代码可运行

### 4. 依赖检查
- [ ] `dependencies` 只包含运行时依赖
- [ ] `peerDependencies` 配置正确
- [ ] `devDependencies` 不包含在发布包中

### 5. 版本管理
- [ ] 更新版本号（如果需要）
- [ ] 提交所有更改到 git
- [ ] 创建 git tag（发布脚本会自动处理）

### 6. NPM 准备
- [ ] 已登录 npm (`npm login`)
- [ ] 有发布权限
- [ ] 包名可用（首次发布）

## 🚀 发布步骤

1. **检查清单**
   ```bash
   # 运行检查清单
   pnpm run check
   ```

2. **构建项目**
   ```bash
   pnpm build
   ```

3. **测试构建结果**
   ```bash
   # 检查 dist 目录
   ls -la dist/
   ```

4. **发布到 npm**
   ```bash
   # 使用发布脚本
   pnpm run publish
   
   # 或手动发布
   npm publish --access public
   ```

5. **验证发布**
   ```bash
   # 检查包是否发布成功
   npm view @tjsglion/sso-icons
   ```

## 📝 发布后检查

- [ ] 包在 npm 上可见
- [ ] 可以正常安装 (`npm install @tjsglion/sso-icons`)
- [ ] 类型声明正常工作
- [ ] 示例代码可以运行
- [ ] 更新相关项目的依赖版本

## 🔄 版本更新

### 补丁版本 (1.0.1)
- 修复 bug
- 文档更新

### 次要版本 (1.1.0)
- 新功能
- 向后兼容的 API 更改

### 主要版本 (2.0.0)
- 破坏性更改
- 重大重构

## 🆘 常见问题

### 发布失败
1. 检查 npm 登录状态
2. 确认包名可用
3. 检查是否有未提交的更改

### 类型错误
1. 确保 TypeScript 编译成功
2. 检查 `dist` 目录中的类型文件
3. 验证 `exports` 配置

### 依赖问题
1. 检查 `peerDependencies` 配置
2. 确保 `dependencies` 不包含开发依赖
3. 验证 `simple-icons` 版本兼容性 