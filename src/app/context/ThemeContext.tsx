"use client";

import { createContext, useContext } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({ isDarkMode: false });

export const useTheme = () => useContext(ThemeContext); 