"use client";

import React, { createContext, useContext, useState } from "react";

interface ThemeContexType {
  mode: string;
  setMode: (mode: string) => void;
}
const ThemeContext = createContext<ThemeContexType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");
  //   const handleThemeChange = () => {
  //     if (mode === "dark") {
  //       setMode("light");
  //       document.documentElement.classList.add("light");
  //     } else {
  //       setMode("dark");
  //       document.documentElement.classList.add("dark");
  //     }
  //   };
  //   handleThemeChange();

  return (
    <ThemeContext.Provider value={{ mode, setMode }}></ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context !== undefined) {
    return context;
  } else {
    throw new Error("useTheme must be used inside theme provider");
  }
}
