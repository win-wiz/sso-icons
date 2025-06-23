import * as simpleIcons from 'simple-icons';

const {
  siGithub,
  siGoogle,
  siFacebook,
  siX: siTwitter,
  siApple,
  siGitlab,
  siBitbucket,
  siAuth0
} = simpleIcons;

// Microsoft的自定义图标
const microsoftIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
  <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
  <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
  <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
</svg>`;

// LinkedIn的自定义图标
const linkedinIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
</svg>`;

// 默认SSO提供商图标配置
export const DEFAULT_SSO_ICONS = {
  github: {
    svg: siGithub.svg,
    backgroundColor: '#181717', // GitHub的标准色
    color: '#ffffff'
  },
  google: {
    svg: siGoogle.svg,
    backgroundColor: '#ffffff',
    color: '#4285F4' // Google的标准蓝色
  },
  microsoft: {
    svg: microsoftIcon,
    backgroundColor: '#ffffff',
    color: '#000000'
  },
  facebook: {
    svg: siFacebook.svg,
    backgroundColor: '#1877F2', // Facebook的标准蓝色
    color: '#ffffff'
  },
  twitter: {
    svg: siTwitter.svg,
    backgroundColor: '#000000', // X (Twitter)的新标准色
    color: '#ffffff'
  },
  apple: {
    svg: siApple.svg,
    backgroundColor: '#000000',
    color: '#ffffff'
  },
  linkedin: {
    svg: linkedinIcon,
    backgroundColor: '#0A66C2',
    color: '#ffffff'
  },
  gitlab: {
    svg: siGitlab.svg,
    backgroundColor: '#FC6D26',
    color: '#ffffff'
  },
  bitbucket: {
    svg: siBitbucket.svg,
    backgroundColor: '#0052CC',
    color: '#ffffff'
  },
  auth0: {
    svg: siAuth0.svg,
    backgroundColor: '#EB5424',
    color: '#ffffff'
  }
} as const;

// 生成默认文字图标
export function generateLetterIcon(name: string): string {
  const letter = name.charAt(0).toUpperCase();
  return `<svg viewBox="0 0 40 40">
    <rect width="40" height="40" rx="20" fill="#6B7280"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="24">${letter}</text>
  </svg>`;
}

// 获取提供商图标
export function getProviderIcon(providerName: string) {
  return DEFAULT_SSO_ICONS[providerName.toLowerCase() as keyof typeof DEFAULT_SSO_ICONS] || null;
} 