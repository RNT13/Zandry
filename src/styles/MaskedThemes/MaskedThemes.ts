import { colorHSLVariants } from '@/utils/colorUtils'
import { DefaultTheme } from 'styled-components'

/* =========================================
   📱 MEDIA QUERIES
========================================= */
export const media = {
  pc: '@media (max-width: 1024px)',
  tablet: '@media (max-width: 768px)',
  mobile: '@media (max-width: 480px)'
}

/* =========================================
   🎨 BASE COLORS
========================================= */
const baseColors = {
  baseGlass: colorHSLVariants(210, 30, 90),
  baseBlack: colorHSLVariants(0, 0, 10),
  baseBlue: colorHSLVariants(220, 80, 50),
  baseGreen: colorHSLVariants(100, 100, 50),
  baseRed: colorHSLVariants(0, 100, 50),
  baseCyan: colorHSLVariants(180, 150, 50),
  baseYellow: colorHSLVariants(60, 100, 50)
}

/* =========================================
   🎨 THEME-SPECIFIC COLORS
========================================= */
const darkColors = {
  primaryColor: '#13161b',
  secondaryColor: '#1c1f25',
  textColor: '#f1f1f1'
}

const lightColors = {
  primaryColor: '#666666',
  secondaryColor: '#a1a1a1',
  textColor: '#13161b'
}

const neonColors = {
  neonPink: { base: '#FF2DAA', glow: '#FF74D1', soft: '#FFD0EC', dark: '#C40078' },
  neonPurple: { base: '#B026FF', glow: '#D06CFF', soft: '#EBCBFF', dark: '#7A00CC' },
  neonBlue: { base: '#00E5FF', glow: '#66F4FF', soft: '#CCFBFF', dark: '#0099CC' },
  neonGreen: { base: '#2BFF88', glow: '#74FFB2', soft: '#D4FFE9', dark: '#00C95A' },
  neonRed: { base: '#FF1744', glow: '#FF5C77', soft: '#FFC2CC', dark: '#C4002B' },
  neonYellow: { base: '#FFE600', glow: '#FFF266', soft: '#FFF9C7', dark: '#C7A800' },
  neonCyan: { base: '#00FFF0', glow: '#66FFF7', soft: '#CCFFFC', dark: '#00BFAF' }
}

const pastelColors = {
  pastelPink: { base: '#F4A9C7', glow: '#F8C5DB', soft: '#FDEAF2', dark: '#E9C4D4' },
  pastelPurple: { base: '#C7B8EA', glow: '#DDD2F4', soft: '#F2EEFB', dark: '#B9A8E3' },
  pastelBlue: { base: '#A9D6F5', glow: '#C7E6FA', soft: '#EAF6FD', dark: '#8C9CF6' },
  pastelGreen: { base: '#B8E0C8', glow: '#D4F0DE', soft: '#EEF9F2', dark: '#7da88a' },
  pastelRed: { base: '#F2B6B6', glow: '#F7CDCD', soft: '#FDEEEE', dark: '#e08888' },
  pastelYellow: { base: '#F6E7A7', glow: '#FAF1C8', soft: '#FEF9E9', dark: '#E2D45C' },
  pastelCyan: { base: '#AEE3E3', glow: '#CFF1F1', soft: '#ECFAFA', dark: '#94E0E3' }
}

/* =========================================
   🧱 STRUCTURE
========================================= */
const structure = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem'
  },
  radius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem'
  },
  boxShadow: {
    xs: `
    box-shadow:
      0 1px 2px rgba(0,0,0,0.12),
      0 2px 6px rgba(0,0,0,0.08);
  `,

    sm: `
    box-shadow:
      0 2px 6px rgba(0,0,0,0.18),
      0 6px 14px rgba(0,0,0,0.10);
  `,

    md: `
    box-shadow:
      0 4px 12px rgba(0,0,0,0.22),
      0 10px 24px rgba(0,0,0,0.14),
      0 0 0 1px rgba(255,255,255,0.03);
  `,

    lg: `
    box-shadow:
      0 8px 20px rgba(0,0,0,0.28),
      0 18px 40px rgba(0,0,0,0.18),
      0 0 0 1px rgba(255,255,255,0.04);
  `,

    xl: `
    box-shadow:
      0 12px 30px rgba(0,0,0,0.35),
      0 24px 60px rgba(0,0,0,0.22),
      0 0 0 1px rgba(255,255,255,0.05);
  `
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem'
  },
  grid: {
    adaptive: 'repeat(auto-fit, minmax(280px, 1fr))',
    autoFit: 'repeat(auto-fit, minmax(260px, 320px))',
    one: 'repeat(1, 1fr)',
    two: 'repeat(2, 1fr)',
    three: 'repeat(3, 1fr)',
    four: 'repeat(4, 1fr)',
    compact: 'repeat(auto-fit, minmax(200px, 1fr))',
    maxWidth: '1100px'
  }
}

/* =========================================
   🎨 THEMES
========================================= */
export const maskedTheme: DefaultTheme = {
  ...structure,
  colors: baseColors
}

export const darkTheme: DefaultTheme = {
  ...structure,
  colors: { ...baseColors, ...darkColors }
}

export const lightTheme: DefaultTheme = {
  ...structure,
  colors: { ...baseColors, ...lightColors }
}

export const neonTheme: DefaultTheme = {
  ...structure,
  colors: { ...baseColors, ...neonColors }
}

export const pastelTheme: DefaultTheme = {
  ...structure,
  colors: { ...baseColors, ...pastelColors }
}

/* =========================================
   📦 EXPORT
========================================= */
export const maskedThemeConfig = {
  default: maskedTheme,
  dark: darkTheme,
  light: lightTheme,
  neon: neonTheme,
  pastel: pastelTheme
}

export type ThemeKey = keyof typeof maskedThemeConfig
