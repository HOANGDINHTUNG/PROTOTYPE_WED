export type Theme = "light" | "dark";
export type Language = "vi" | "en";

export interface UIContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

export interface NavItem {
  label: string;
  to: string;
  description: string;
}
