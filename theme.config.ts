export type DesignStyle = 'flat' | 'gradient' | 'skeuomorphic'
export type ThemeMode = 'light' | 'dark'

export interface ThemeTokens {
  colors: {
    primary: string
    primaryHover: string
    primaryFg: string
    background: string
    surface: string
    surfaceHover: string
    textPrimary: string
    textSecondary: string
    textMuted: string
    border: string
    borderHover: string
  }
  typography: {
    fontBody: string
    fontHeading: string
  }
  spacing: {
    sectionPaddingY: string
    containerMaxWidth: string
    containerPaddingX: string
  }
  shape: {
    radiusSm: string
    radiusMd: string
    radiusLg: string
    radiusXl: string
    radiusFull: string
  }
  shadows: {
    shadowSm: string
    shadowMd: string
    shadowLg: string
  }
}

export interface ThemeConfig {
  designStyle: DesignStyle
  defaultMode: ThemeMode
  light: ThemeTokens
  dark: ThemeTokens
}

const themeConfig: ThemeConfig = {
  designStyle: 'flat',
  defaultMode: 'light',
  light: {
    colors: {
      primary: '#0066cc',
      primaryHover: '#0052a3',
      primaryFg: '#ffffff',
      background: '#ffffff',
      surface: '#f8f9fa',
      surfaceHover: '#f0f2f5',
      textPrimary: '#111827',
      textSecondary: '#374151',
      textMuted: '#6b7280',
      border: '#e5e7eb',
      borderHover: '#d1d5db',
    },
    typography: {
      fontBody: "'Inter', system-ui, -apple-system, sans-serif",
      fontHeading: "'Inter', system-ui, -apple-system, sans-serif",
    },
    spacing: {
      sectionPaddingY: '5rem',
      containerMaxWidth: '1280px',
      containerPaddingX: '1.5rem',
    },
    shape: {
      radiusSm: '0.25rem',
      radiusMd: '0.5rem',
      radiusLg: '0.75rem',
      radiusXl: '1rem',
      radiusFull: '9999px',
    },
    shadows: {
      shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
  },
  dark: {
    colors: {
      primary: '#4da6ff',
      primaryHover: '#3d96ef',
      primaryFg: '#000000',
      background: '#0f172a',
      surface: '#1e293b',
      surfaceHover: '#2d3f56',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      border: '#334155',
      borderHover: '#475569',
    },
    typography: {
      fontBody: "'Inter', system-ui, -apple-system, sans-serif",
      fontHeading: "'Inter', system-ui, -apple-system, sans-serif",
    },
    spacing: {
      sectionPaddingY: '5rem',
      containerMaxWidth: '1280px',
      containerPaddingX: '1.5rem',
    },
    shape: {
      radiusSm: '0.25rem',
      radiusMd: '0.5rem',
      radiusLg: '0.75rem',
      radiusXl: '1rem',
      radiusFull: '9999px',
    },
    shadows: {
      shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
      shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    },
  },
}

export default themeConfig
