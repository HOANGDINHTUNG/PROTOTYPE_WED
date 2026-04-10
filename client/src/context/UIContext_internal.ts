import { createContext } from "react";
import type { UIContextType } from "../types/ui";

export const UIContext = createContext<UIContextType | undefined>(undefined);
