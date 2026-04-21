import 'styled-components'

/* =========================================
   🎨 COLOR VARIANTS
========================================= */
export interface ColorVariants {
  base: string
  light: string
  light02: string
  light04: string
  light08: string
  light20: string
  light30: string
  light40: string
  light50: string
  dark: string
  dark02: string
  dark04: string
  dark08: string
  dark20: string
  dark30: string
  dark40: string
  dark50: string
}

export interface NeonColorVariant {
  base: string
  glow: string
  soft: string
}

export interface PastelColorVariant {
  base: string
  glow: string
  soft: string
  dark: string
}

/* =========================================
   🎨 COLOR GROUPS
========================================= */
export interface BaseColors {
  baseGlass: ColorVariants
  baseBlack: ColorVariants
  baseBlue: ColorVariants
  baseGreen: ColorVariants
  baseRed: ColorVariants
  baseCyan: ColorVariants
  baseYellow: ColorVariants
}

export interface NeonColors {
  neonPink: NeonColorVariant
  neonPurple: NeonColorVariant
  neonBlue: NeonColorVariant
  neonGreen: NeonColorVariant
  neonRed: NeonColorVariant
  neonYellow: NeonColorVariant
  neonCyan: NeonColorVariant
}

export interface PastelColors {
  pastelPink: PastelColorVariant
  pastelPurple: PastelColorVariant
  pastelBlue: PastelColorVariant
  pastelGreen: PastelColorVariant
  pastelRed: PastelColorVariant
  pastelYellow: PastelColorVariant
  pastelCyan: PastelColorVariant
}

/* =========================================
   🔌 DEFAULT THEME (UNIFICADO)
========================================= */
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: BaseColors &
      Partial<NeonColors> &
      Partial<PastelColors> & {
        primaryColor?: string
        secondaryColor?: string
        textColor?: string
      }

    spacing: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
    }

    radius: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
    }

    boxShadow: {
      sm: string
      md: string
      lg: string
    }

    fontSize: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
    }

    grid: {
      adaptive: string
      autoFit: string
      one: string
      two: string
      three: string
      four: string
      compact: string
      maxWidth: string
    }
  }
}
