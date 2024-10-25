"use client";

import "./globals.css";
import { useState } from "react";
import Metadata from "./Metadata";


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
      <body className={`antialiased ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black "}`}>
        <button onClick={toggleDarkMode} className="fixed top-4 right-4 bg-blue-500 text-white  p-2 rounded">
          {isDarkMode ? "Mode Clair" : "Mode Sombre"}
        </button>
        {children}
      </body>
    </html>
  );
}
