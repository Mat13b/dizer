"use client";

import "./globals.css";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <html lang="fr" className={isDarkMode ? "dark" : ""}>
      <body 
        className={`min-h-screen transition-all duration-300 ${
          isDarkMode 
            ? "bg-zinc-900 text-white" 
            : "bg-zinc-50 text-black"
        }`}
      >
        <button 
          onClick={toggleDarkMode} 
          className={`fixed top-4 right-4 p-3 rounded-full transition-all duration-300 z-50 ${
            isDarkMode 
              ? "bg-zinc-700 text-white hover:bg-zinc-600" 
              : "bg-zinc-200 text-black hover:bg-zinc-300"
          }`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <main className="transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}
