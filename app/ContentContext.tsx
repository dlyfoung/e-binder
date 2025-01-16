import { createContext } from "react";

export const ContentContext = createContext<ContentMode>("read");

export type ContentMode = "message" | "read";
