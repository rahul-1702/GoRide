import React, { createContext, useState, useMemo } from "react";

export const themeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <themeContext.Provider value={themeValue}>
      {children}
    </themeContext.Provider>
  );
}

export default ThemeProvider;
