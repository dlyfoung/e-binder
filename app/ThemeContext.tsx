import { createContext } from "react";

export const ThemeContext = createContext<Theme>("light");

export type Theme = "light" | "dark";
