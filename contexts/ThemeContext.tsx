'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

const PRIMARY_COLOR_LIGHT = '#0B3127';
const PRIMARY_COLOR_DARK = '#10B981'; // Emerald green for dark mode

// Dark mode color palette
const DARK_COLORS = {
  background: '#0F172A', // Dark slate
  paper: '#1E293B', // Lighter slate for sidebar
  text: '#E2E8F0', // Light gray text
  textSecondary: '#94A3B8', // Muted text
  border: '#334155', // Border color
  hover: 'rgba(16, 185, 129, 0.08)', // Emerald with transparency
  active: 'rgba(16, 185, 129, 0.12)',
};

// Light mode color palette
const LIGHT_COLORS = {
  background: '#FFFFFF',
  paper: '#FFFFFF',
  text: PRIMARY_COLOR_LIGHT,
  textSecondary: '#666666',
  border: '#E0E0E0',
  hover: 'rgba(11, 49, 39, 0.08)',
  active: 'rgba(11, 49, 39, 0.12)',
};

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  primaryColor: string;
  colors: typeof LIGHT_COLORS;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const primaryColor = darkMode ? PRIMARY_COLOR_DARK : PRIMARY_COLOR_LIGHT;
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        primaryColor,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
