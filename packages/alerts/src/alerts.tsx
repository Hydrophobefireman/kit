import {persist, show} from "./_impl";

export function useAlerts() {
  return {show, persist};
}
