import { DEFAULT_SSO_ICONS, generateLetterIcon } from '../config/default-icons.js';

export interface SSOProvider {
  id: string;
  name: string;
  type: string;
  iconSvg?: string;
  iconBackgroundColor?: string;
  iconColor?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IconInfo {
  type: 'svg';
  content: string;
  backgroundColor?: string;
  color?: string;
}

export interface SSOIconProps {
  provider: SSOProvider;
  size?: number | string;
  className?: string;
  style?: Record<string, any>;
  onClick?: (event: any) => void;
}

export class IconManager {
  // 获取图标信息
  static getIconInfo(provider: SSOProvider): IconInfo {
    // 如果提供商自定义了SVG图标，优先使用自定义图标
    if (provider.iconSvg) {
      return {
        type: 'svg',
        content: provider.iconSvg,
        backgroundColor: provider.iconBackgroundColor || '#FFFFFF',
        color: provider.iconColor || '#000000'
      };
    }

    // 尝试获取默认图标
    const defaultIcon = DEFAULT_SSO_ICONS[provider.name.toLowerCase() as keyof typeof DEFAULT_SSO_ICONS];
    if (defaultIcon) {
      return {
        type: 'svg',
        content: defaultIcon.svg,
        backgroundColor: defaultIcon.backgroundColor,
        color: defaultIcon.color
      };
    }

    // 如果没有图标，生成文字图标
    return {
      type: 'svg',
      content: generateLetterIcon(provider.name),
      backgroundColor: '#6B7280',
      color: '#FFFFFF'
    };
  }

  // 验证SVG内容
  static validateSvgContent(content: string): boolean {
    if (!content) return false;
    
    // 简单的SVG验证
    const isValidSvg = content.trim().startsWith('<svg') && 
                      content.trim().endsWith('</svg>');
    
    // 安全检查
    const hasScriptTag = content.toLowerCase().includes('<script');
    const hasEventHandlers = /\bon\w+\s*=/i.test(content);
    const hasExternalResources = /(xlink:href|href)\s*=\s*["'](?!#)/i.test(content);
    
    return isValidSvg && 
           !hasScriptTag && 
           !hasEventHandlers && 
           !hasExternalResources;
  }

  // 清理和优化SVG
  static sanitizeSvg(content: string): string {
    if (!content) return '';
    
    // 移除注释
    content = content.replace(/<!--[\s\S]*?-->/g, '');
    
    // 移除空格和换行
    content = content.replace(/>\s+</g, '><');
    
    // 移除不安全的属性
    content = content.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
    
    return content.trim();
  }

  // 生成预览数据URL
  static generatePreviewDataUrl(svg: string): string {
    if (!this.validateSvgContent(svg)) {
      return '';
    }
    
    const sanitizedSvg = this.sanitizeSvg(svg);
    return `data:image/svg+xml;base64,${btoa(sanitizedSvg)}`;
  }

  // 获取所有可用的默认图标名称
  static getAvailableIconNames(): string[] {
    return Object.keys(DEFAULT_SSO_ICONS);
  }

  // 检查是否有默认图标
  static hasDefaultIcon(providerName: string): boolean {
    return providerName.toLowerCase() in DEFAULT_SSO_ICONS;
  }

  // 获取默认图标配置
  static getDefaultIcon(providerName: string) {
    return DEFAULT_SSO_ICONS[providerName.toLowerCase() as keyof typeof DEFAULT_SSO_ICONS] || null;
  }
} 