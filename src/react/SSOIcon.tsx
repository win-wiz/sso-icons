"use client";

import React from 'react';
import { IconManager } from '../utils/icon-manager.js';
import type { SSOProvider, SSOIconProps } from '../utils/icon-manager.js';

export const SSOIcon: React.FC<SSOIconProps> = ({ 
  provider, 
  size = 24,
  className = '',
  style = {},
  onClick
}) => {
  const iconInfo = IconManager.getIconInfo(provider);
  
  const iconStyle: React.CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    backgroundColor: iconInfo.backgroundColor,
    color: iconInfo.color,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  };

  return (
    <div
      className={`sso-icon ${className}`}
      style={iconStyle}
      dangerouslySetInnerHTML={{ 
        __html: iconInfo.content 
      }}
      title={`${provider.name} Login`}
      onClick={onClick}
    />
  );
}; 