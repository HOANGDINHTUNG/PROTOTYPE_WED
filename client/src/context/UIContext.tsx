import React, { useEffect, useState } from "react";

import type { Theme, Language } from "../types/ui";
import { UIContext } from "./UIContext_internal";

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as Theme) || "light";
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "vi";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
    import("../i18n").then(({ default: i18n }) => {
      i18n.changeLanguage(language);
    });
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <UIContext.Provider value={{ theme, language, toggleTheme, setLanguage }}>
      {children}
    </UIContext.Provider>
  );
};
