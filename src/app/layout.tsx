"use client";

import "./globals.css";
import { useState } from "react";
import { Moon } from "lucide-react";
import { ThemeContext } from "./context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <title>Dizer</title>
        <meta name="description" content="Application de streaming musical" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body 
        className={`m-0 p-0 min-h-screen w-full transition-colors duration-300 overflow-x-hidden ${
          isDarkMode ? "bg-zinc-900" : "bg-white"
        }`}
      >
        <ThemeContext.Provider value={{ isDarkMode }}>
          <button 
            onClick={toggleDarkMode} 
            className={`fixed top-4 sm:top-5 md:top-6 lg:top-8 
              right-4 sm:right-5 md:right-6 lg:right-8 
              p-2 sm:p-2.5 md:p-3
              rounded-full 
              transition-all duration-300 
              z-50 
              hover:scale-110
              ${isDarkMode 
                ? "bg-zinc-200 rotate-[360deg]" 
                : "bg-zinc-200 rotate-0"
              }`}
          >
            <Moon 
              className={`w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 
                transition-colors duration-300 
                ${isDarkMode ? "text-zinc-900" : "text-black"}`} 
            />
          </button>

          <div className="flex flex-col min-h-screen w-full m-0 p-0">
            <div className="flex-1 flex items-center justify-center w-full">
              <main className="w-full transition-all duration-300">
                {children}
              </main>
            </div>
          </div>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
