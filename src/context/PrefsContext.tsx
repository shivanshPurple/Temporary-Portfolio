import React, { createContext, useContext, useEffect, useState } from "react";

interface PrefsContextType {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const PrefsContext = createContext<PrefsContextType | undefined>(undefined);

export const usePrefs = () => {
  const context = useContext(PrefsContext);
  if (context === undefined) {
    throw new Error("usePrefs must be used within a PrefsProvider");
  }
  return context;
};

interface PrefsProviderProps {
  children: React.ReactNode;
}

export const PrefsProvider: React.FC<PrefsProviderProps> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(() => {
    // Check if user has prefers-reduced-motion enabled
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    // Default to dark theme
    return "dark";
  });

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const value = {
    reducedMotion,
    toggleReducedMotion,
    theme,
    toggleTheme,
  };

  return (
    <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
  );
};
