import { _util } from "@hydrophobefireman/kit";
import { createContext } from "@hydrophobefireman/ui-lib";

import { ToastOptions } from "./types";

const defaultAlertContext = {
  show(options: ToastOptions) {},
  persist(options: ToastOptions) {},
};
export type AlertContextType = typeof defaultAlertContext;
export const AlertContext = createContext(defaultAlertContext);
