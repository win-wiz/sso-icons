# @tjsglion/sso-icons

SSO 提供商图标包，为认证系统提供统一的图标管理。

## 特性

- 🎨 **丰富的默认图标** - 支持 GitHub、Google、Microsoft、Facebook、Twitter、Apple、LinkedIn 等主流 SSO 提供商
- 🔧 **灵活的配置** - 支持自定义 SVG 图标和颜色配置
- ⚡ **轻量级** - 基于 Simple Icons，体积小巧
- 🛡️ **安全** - SVG 内容验证和清理
- 📱 **响应式** - 支持不同尺寸和样式
- 🔌 **易于集成** - 提供 React 组件和工具函数

## 安装

```bash
npm install @tjsglion/sso-icons
# 或
yarn add @tjsglion/sso-icons
# 或
pnpm add @tjsglion/sso-icons
```

## 使用方法

### React 组件

```tsx
import { SSOIcon } from '@tjsglion/sso-icons/react';
import type { SSOProvider } from '@tjsglion/sso-icons';

const provider: SSOProvider = {
  id: 'github',
  name: 'GitHub',
  type: 'oauth',
  iconSvg: '<svg>...</svg>', // 可选：自定义图标
  iconBackgroundColor: '#181717', // 可选：背景色
  iconColor: '#ffffff' // 可选：图标色
};

function LoginButton() {
  return (
    <SSOIcon 
      provider={provider}
      size={24}
      className="login-icon"
      onClick={() => console.log('GitHub login')}
    />
  );
}
```

### 工具函数

```tsx
import { IconManager, DEFAULT_SSO_ICONS } from '@tjsglion/sso-icons';

// 获取图标信息
const iconInfo = IconManager.getIconInfo(provider);

// 检查是否有默认图标
const hasIcon = IconManager.hasDefaultIcon('github');

// 获取默认图标配置
const defaultIcon = IconManager.getDefaultIcon('github');

// 获取所有可用图标名称
const availableIcons = IconManager.getAvailableIconNames();
```

### 默认图标

```tsx
import { DEFAULT_SSO_ICONS } from '@tjsglion/sso-icons';

// 支持的默认图标
console.log(Object.keys(DEFAULT_SSO_ICONS));
// ['github', 'google', 'microsoft', 'facebook', 'twitter', 'apple', 'linkedin', 'gitlab', 'bitbucket', 'auth0']
```

## API 参考

### SSOIcon 组件

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `provider` | `SSOProvider` | - | SSO 提供商信息 |
| `size` | `number \| string` | `24` | 图标尺寸 |
| `className` | `string` | `''` | CSS 类名 |
| `style` | `CSSProperties` | `{}` | 内联样式 |
| `onClick` | `(event) => void` | - | 点击事件处理 |

### SSOProvider 接口

```tsx
interface SSOProvider {
  id: string;
  name: string;
  type: string;
  iconSvg?: string;           // 自定义 SVG 图标
  iconBackgroundColor?: string; // 图标背景色
  iconColor?: string;         // 图标颜色
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### IconManager 类

#### 静态方法

- `getIconInfo(provider: SSOProvider): IconInfo` - 获取图标信息
- `validateSvgContent(content: string): boolean` - 验证 SVG 内容
- `sanitizeSvg(content: string): string` - 清理 SVG 内容
- `generatePreviewDataUrl(svg: string): string` - 生成预览数据 URL
- `getAvailableIconNames(): string[]` - 获取所有可用图标名称
- `hasDefaultIcon(providerName: string): boolean` - 检查是否有默认图标
- `getDefaultIcon(providerName: string)` - 获取默认图标配置

## 图标优先级

1. **自定义图标** - 如果 `provider.iconSvg` 存在，优先使用
2. **默认图标** - 如果提供商名称匹配默认图标，使用默认图标
3. **文字图标** - 生成基于提供商名称首字母的文字图标

## 样式定制

```css
.sso-icon {
  /* 自定义样式 */
  border-radius: 8px;
  transition: transform 0.2s;
}

.sso-icon:hover {
  transform: scale(1.1);
}
```

## 与 SSO 服务集成

```tsx
import { SSOIcon } from '@tjsglion/sso-icons/react';

// 从 API 获取提供商列表
const providers = await fetch('/api/sso/providers').then(r => r.json());

// 渲染登录按钮
{providers.map(provider => (
  <SSOIcon 
    key={provider.id}
    provider={provider}
    onClick={() => handleLogin(provider.id)}
  />
))}
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 清理
pnpm clean
```

## 许可证

MIT 