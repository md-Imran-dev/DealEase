import { createTheme } from '@mui/material/styles';

/**
 * DealEase Color Palette
 * 
 * Primary Colors:
 * - Primary Dark (Royal Blue): #0A2463 - Deep, professional blue for headers and important elements
 * - Primary (Celestial Blue): #3E92CC - Main brand color for buttons and links
 * - Primary Light: #7DC6E6 - Tint of Celestial Blue for hover states and lighter elements
 * 
 * Background Colors:
 * - Background (Ghost White): #FFFAFF - Main page background, very light with subtle warmth
 * - Surface/Card Background: #FFFFFF - Pure white for cards and surfaces
 * 
 * Accent Colors:
 * - Accent (Cerise): #D8315B - Bold accent for CTAs and important highlights
 * - Accent Light: #F57A95 - Tint of Cerise for hover states
 * 
 * Text Colors:
 * - Neutral Dark (Eerie Black): #1E1B18 - Main text color, softer than pure black
 * - Secondary Text: #6B7280 - Muted text for secondary information
 * 
 * Utility Colors:
 * - Card Shadow/Divider: #E5E7EB - Subtle borders and dividers
 * - Success: #5CB85C - Green for positive actions
 * - Warning: #FFD166 - Yellow for warnings
 * - Error: #D8315B - Same as accent for consistency
 * - Info: #3E92CC - Same as primary for consistency
 */

// Color Palette Constants
const colors = {
  // Primary Colors
  primaryDark: '#0A2463',     // Royal Blue
  primary: '#3E92CC',         // Celestial Blue  
  primaryLight: '#7DC6E6',    // Tint of Celestial Blue

  // Background Colors
  background: '#FFFAFF',      // Ghost White
  surface: '#FFFFFF',         // Pure White

  // Accent Colors
  accent: '#D8315B',          // Cerise
  accentLight: '#F57A95',     // Tint of Cerise

  // Text Colors
  textPrimary: '#1E1B18',     // Eerie Black
  textSecondary: '#6B7280',   // Secondary Text
  textOnPrimary: '#FFFFFF',   // White text for dark backgrounds

  // Utility Colors
  cardShadow: '#E5E7EB',      // Card Shadow/Divider
  success: '#5CB85C',         // Success Green
  warning: '#FFD166',         // Warning Yellow
  error: '#D8315B',           // Error (same as accent)
  info: '#3E92CC',            // Info (same as primary)
} as const;

// Dark mode color variations
const darkColors = {
  // Primary Colors (maintain brand consistency)
  primaryDark: colors.primaryDark,    // #0A2463 - Royal Blue
  primary: colors.primary,            // #3E92CC - Celestial Blue  
  primaryLight: colors.primaryLight,  // #7DC6E6 - Tint of Celestial Blue

  // Background Colors (inverted for dark mode)
  background: '#0F0F0F',              // Very dark background
  surface: '#1A1A1A',                 // Dark surface for cards

  // Accent Colors (maintain visibility)
  accent: colors.accent,              // #D8315B - Cerise
  accentLight: colors.accentLight,    // #F57A95 - Tint of Cerise

  // Text Colors (inverted for dark mode)
  textPrimary: '#F5F5F5',            // Light text for dark backgrounds
  textSecondary: '#B0B0B0',          // Muted light text
  textOnPrimary: '#FFFFFF',          // White text for colored backgrounds

  // Utility Colors (adjusted for dark mode)
  cardShadow: '#2A2A2A',             // Darker borders/dividers
  success: colors.success,            // #5CB85C - Keep for visibility
  warning: colors.warning,            // #FFD166 - Keep for visibility
  error: colors.error,                // #D8315B - Keep for visibility
  info: colors.info,                  // #3E92CC - Keep for visibility
} as const;

// Helper function to create theme with mode
const createAppTheme = (mode: 'light' | 'dark' = 'light') => {
  const isLight = mode === 'light';
  const themeColors = isLight ? colors : darkColors;

  return createTheme({
    palette: {
      mode,
      // Primary color scheme using Celestial Blue
      primary: {
        main: themeColors.primary,        // #3E92CC - Celestial Blue
        light: themeColors.primaryLight,  // #7DC6E6 - Tint of Celestial Blue
        dark: themeColors.primaryDark,    // #0A2463 - Royal Blue
        contrastText: themeColors.textOnPrimary, // White text
      },

      // Secondary using accent colors
      secondary: {
        main: themeColors.accent,         // #D8315B - Cerise
        light: themeColors.accentLight,   // #F57A95 - Tint of Cerise
        dark: '#B8264A',                  // Darker shade of Cerise
        contrastText: themeColors.textOnPrimary, // White text
      },

      // Custom accent color (same as secondary but for semantic clarity)
      accent: {
        main: themeColors.accent,         // #D8315B - Cerise
        light: themeColors.accentLight,   // #F57A95 - Tint of Cerise  
        dark: '#B8264A',                  // Darker shade of Cerise
      },

      // Surface colors for cards and elevated content
      surface: {
        main: themeColors.surface,        // #FFFFFF or #1A1A1A
        light: isLight ? '#FAFAFA' : '#252525',
        dark: themeColors.cardShadow,     // #E5E7EB or #2A2A2A
      },

      // Semantic colors
      success: {
        main: themeColors.success,        // #5CB85C
        light: '#7BC97B',                 // Lighter success
        dark: '#4A9A4A',                  // Darker success
        contrastText: isLight ? '#FFFFFF' : themeColors.textPrimary,
      },
      warning: {
        main: themeColors.warning,        // #FFD166
        light: '#FFE085',                 // Lighter warning
        dark: '#E6BC4D',                  // Darker warning
        contrastText: isLight ? themeColors.textPrimary : '#000000', // Ensure readability
      },
      error: {
        main: themeColors.error,          // #D8315B - Same as accent
        light: themeColors.accentLight,   // #F57A95
        dark: '#B8264A',                  // Darker error
        contrastText: themeColors.textOnPrimary,
      },
      info: {
        main: themeColors.info,           // #3E92CC - Same as primary
        light: themeColors.primaryLight,  // #7DC6E6
        dark: themeColors.primaryDark,    // #0A2463
        contrastText: themeColors.textOnPrimary,
      },

      // Background colors
      background: {
        default: themeColors.background,  // #FFFAFF or #0F0F0F
        paper: themeColors.surface,       // #FFFFFF or #1A1A1A
      },

      // Text colors
      text: {
        primary: themeColors.textPrimary,    // #1E1B18 or #F5F5F5
        secondary: themeColors.textSecondary, // #6B7280 or #B0B0B0
      },

      // Dividers and borders
      divider: themeColors.cardShadow,     // #E5E7EB or #2A2A2A

      // Gray scale (adjusted for mode)
      grey: isLight ? {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: themeColors.cardShadow,       // #E5E7EB
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: themeColors.textSecondary,    // #6B7280
        700: '#616161',
        800: '#424242',
        900: '#1E1B18',
      } : {
        50: '#2A2A2A',
        100: '#353535',
        200: '#404040',
        300: '#4A4A4A',
        400: '#5A5A5A',
        500: '#6A6A6A',
        600: '#7A7A7A',
        700: '#8A8A8A',
        800: '#B0B0B0',
        900: '#F5F5F5',
      },
    },
    typography: {
      fontFamily: '"Inter", "SF Pro Display", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.75rem',
        lineHeight: 1.15,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2.25rem',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.875rem',
        lineHeight: 1.25,
        letterSpacing: '-0.015em',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.35,
        letterSpacing: '-0.005em',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.65,
        letterSpacing: '0.01em',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
        letterSpacing: '0.01em',
      },
      button: {
        fontWeight: 600,
        textTransform: 'none' as const,
        letterSpacing: '0.025em',
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        letterSpacing: '0.02em',
      },
    },
    shape: {
      borderRadius: 16, // More rounded for friendlier feel
    },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            padding: '12px 24px',
            fontSize: '0.95rem',
            boxShadow: 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-1px)',
            },
          },
          contained: {
            background: themeColors.primary, // Celestial Blue
            '&:hover': {
              background: themeColors.primaryDark, // Royal Blue on hover
            },
          },
          containedSecondary: {
            background: themeColors.accent, // Cerise
            '&:hover': {
              background: '#B8264A', // Darker Cerise on hover
            },
          },
          outlined: {
            borderWidth: '2px',
            borderColor: themeColors.primary,
            color: themeColors.primary,
            '&:hover': {
              borderWidth: '2px',
              backgroundColor: `${themeColors.primary}08`, // 8% opacity
              borderColor: themeColors.primaryDark,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.02)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              fontSize: '0.95rem',
              '& fieldset': {
                borderColor: themeColors.cardShadow, // #E5E7EB or #2A2A2A
                borderWidth: '2px',
              },
              '&:hover fieldset': {
                borderColor: themeColors.primaryLight, // #7DC6E6
              },
              '&.Mui-focused fieldset': {
                borderColor: themeColors.primary, // #3E92CC
                borderWidth: '2px',
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.95rem',
              fontWeight: 500,
            },
            '& .MuiFormHelperText-root': {
              fontSize: '0.8rem',
              marginTop: 8,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
            fontSize: '0.85rem',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: themeColors.textPrimary, // #1E1B18 or #F5F5F5
            color: isLight ? themeColors.textOnPrimary : themeColors.surface,
            fontSize: '0.8rem',
            fontWeight: 500,
            borderRadius: 8,
            padding: '8px 12px',
            maxWidth: 250,
          },
          arrow: {
            color: themeColors.textPrimary, // #1E1B18 or #F5F5F5
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontSize: '0.9rem',
            '& .MuiAlert-icon': {
              fontSize: '1.2rem',
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            height: 8,
            backgroundColor: themeColors.cardShadow, // #E5E7EB or #2A2A2A
          },
          bar: {
            borderRadius: 8,
            background: `linear-gradient(90deg, ${themeColors.primary} 0%, ${themeColors.primaryLight} 100%)`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: themeColors.surface, // #FFFFFF or #1A1A1A
            borderRight: `1px solid ${themeColors.cardShadow}`, // #E5E7EB or #2A2A2A
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: themeColors.surface, // #FFFFFF or #1A1A1A
            color: themeColors.textPrimary, // #1E1B18 or #F5F5F5
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '4px 8px',
            '&:hover': {
              backgroundColor: `${themeColors.primary}08`, // 8% opacity
            },
            '&.Mui-selected': {
              backgroundColor: `${themeColors.primary}12`, // 12% opacity
              '&:hover': {
                backgroundColor: `${themeColors.primary}16`, // 16% opacity
              },
            },
          },
        },
      },
    },
  });
};

// Create light and dark theme instances
const lightTheme = createAppTheme('light');
const darkTheme = createAppTheme('dark');

// Extend the theme interface to include custom colors and dark mode support
declare module '@mui/material/styles' {
  interface Palette {
    accent: {
      main: string;
      light: string;
      dark: string;
    };
    surface: {
      main: string;
      light: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    accent?: {
      main: string;
      light: string;
      dark: string;
    };
    surface?: {
      main: string;
      light: string;
      dark: string;
    };
  }

  interface TypeBackground {
    default: string;
    paper: string;
    surface: string;
  }
}

// Export the color constants and theme creation function for use in components
export { colors, darkColors, createAppTheme, lightTheme, darkTheme };

// Export light theme as default for backward compatibility
export default lightTheme;
