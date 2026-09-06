import type ITheme from "@interfaces/ITheme";

const DefaultTheme: ITheme = {
  accentColor: "#a4d5eb",
  primaryColor: "#35383a",
  secondaryColor: "#d2d2d2",
  backgroundColor: "#ffffff",
};

const CoffeeTheme: ITheme = {
  accentColor: "#b79e68",
  primaryColor: "#6d4941",
  secondaryColor: "#d5cdbc",
  backgroundColor: "#f2eada",
};

const NepalTheme: ITheme = {
  accentColor: "#47679c",
  primaryColor: "#da7388",
  secondaryColor: "#5c636e",
  backgroundColor: "#ffffff",
};

const CodeTheme: ITheme = {
  accentColor: "#9090AA",
  primaryColor: "#676789",
  secondaryColor: "#ABABAC",
  backgroundColor: "#444455",
};

const themes = new Map<string, ITheme>();
themes.set("default", DefaultTheme);
themes.set("coffee", CoffeeTheme);
themes.set("nepal", NepalTheme);
themes.set("code", CodeTheme);

export function getThemesNames() {
  return themes.keys();
}

export function applyTheme(themeName: string) {
  const root = document.querySelector(":root") as HTMLElement;
  const theme = themes.get(themeName);

  if (theme) {
    root.style.setProperty("--accent-clr", theme.accentColor);
    root.style.setProperty("--primary-clr", theme.primaryColor);
    root.style.setProperty("--secondary-clr", theme.secondaryColor);
    root.style.setProperty("--background-clr", theme.backgroundColor);
  }
}
