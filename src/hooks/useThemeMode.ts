import { useState, useEffect, useMemo } from 'react';
import { createAppTheme, lightTheme, darkTheme } from '../theme/theme';

/**
 * useThemeMode Hook
 * 
 * Provides theme mode management with localStorage persistence
 * and system preference detection.
 * 
 * @returns {Object} Theme mode utilities and current theme
 */
export const useThemeMode = () => {
    // Initialize theme mode from localStorage or system preference
    const [mode, setMode] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('dealease-theme-mode') as 'light' | 'dark' | null;
            if (savedMode) {
                return savedMode;
            }
            // Check system preference
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    // Update localStorage when mode changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('dealease-theme-mode', mode);
            // Update CSS custom properties data attribute
            document.documentElement.setAttribute('data-theme', mode);
        }
    }, [mode]);

    // Listen for system theme changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            const handleChange = (e: MediaQueryListEvent) => {
                // Only update if user hasn't manually set a preference
                const savedMode = localStorage.getItem('dealease-theme-mode');
                if (!savedMode) {
                    setMode(e.matches ? 'dark' : 'light');
                }
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);

    // Memoize the theme to prevent unnecessary re-renders
    const theme = useMemo(() => {
        return mode === 'dark' ? darkTheme : lightTheme;
    }, [mode]);

    // Theme mode utilities
    const toggleMode = () => {
        setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    };

    const setLightMode = () => setMode('light');
    const setDarkMode = () => setMode('dark');

    const resetToSystemPreference = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('dealease-theme-mode');
            const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setMode(systemPreference);
        }
    };

    return {
        mode,
        theme,
        toggleMode,
        setLightMode,
        setDarkMode,
        resetToSystemPreference,
        isDarkMode: mode === 'dark',
        isLightMode: mode === 'light',
    };
};

/**
 * useSystemThemePreference Hook
 * 
 * Returns the user's system theme preference without managing state.
 * Useful for components that need to know system preference but don't
 * want to control the theme.
 */
export const useSystemThemePreference = () => {
    const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            const handleChange = (e: MediaQueryListEvent) => {
                setSystemPreference(e.matches ? 'dark' : 'light');
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);

    return {
        systemPreference,
        isSystemDark: systemPreference === 'dark',
        isSystemLight: systemPreference === 'light',
    };
};

/**
 * Example usage:
 * 
 * ```tsx
 * import { useThemeMode } from '../hooks/useThemeMode';
 * 
 * const App = () => {
 *   const { theme, mode, toggleMode, isDarkMode } = useThemeMode();
 *   
 *   return (
 *     <ThemeProvider theme={theme}>
 *       <CssBaseline />
 *       <IconButton onClick={toggleMode}>
 *         {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
 *       </IconButton>
 *       {/* Rest of your app */}
 * </ThemeProvider>
    *   );
 * };
 * ```
 */
