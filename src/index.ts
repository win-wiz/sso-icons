import { SSOIcon } from './react/SSOIcon.js';
import { IconManager } from './utils/icon-manager.js';
import { DEFAULT_SSO_ICONS, generateLetterIcon, getProviderIcon } from './config/default-icons.js';

export { SSOIcon, IconManager, DEFAULT_SSO_ICONS, generateLetterIcon, getProviderIcon };

// 类型导出
export type {
  SSOProvider,
  IconInfo,
  SSOIconProps
} from './utils/icon-manager.js';

// 默认导出
export default SSOIcon; 