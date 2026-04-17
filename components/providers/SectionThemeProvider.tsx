// components/providers/SectionThemeProvider.tsx
"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type Section =
  | "workspace"
  | "sales"
  | "inventory"
  | "reports"
  | "settings";

type SectionThemeContextValue = {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
};

const SectionThemeContext = createContext<SectionThemeContextValue | null>(
  null,
);

const themeClassBySection: Record<Section, string> = {
  workspace: "theme-workspace",
  sales: "theme-sales",
  inventory: "theme-inventory",
  reports: "theme-reports",
  settings: "theme-settings",
};

type SectionThemeProviderProps = {
  children: React.ReactNode;
  defaultSection?: Section;
};

export const SectionThemeProvider = ({
  children,
  defaultSection = "workspace",
}: SectionThemeProviderProps) => {
  const [activeSection, setActiveSection] = useState<Section>(defaultSection);

  const value = useMemo(
    () => ({ activeSection, setActiveSection }),
    [activeSection],
  );

  const themeClass = themeClassBySection[activeSection];

  return (
    <SectionThemeContext.Provider value={value}>
      <section className={themeClass}>{children}</section>
    </SectionThemeContext.Provider>
  );
};

export const useSectionTheme = () => {
  const context = useContext(SectionThemeContext);
  if (!context) {
    throw new Error("useSectionTheme must be used within SectionThemeProvider");
  }
  return context;
};
