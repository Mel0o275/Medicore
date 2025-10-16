import { create } from "zustand";
import {
  primaryColor,
  primaryText,
  secondaryColor,
  secondaryText,
} from "../Constants/Colors";

const useTheme = create((set, get) => ({
  mode: "Light",
  primaryColor: primaryColor,
  secondaryColor: secondaryColor,
  primaryText: primaryText,
  secondaryText: secondaryText,

  toggleColors: (pc, sc, pt, st) => {
    set({
      primaryColor: pc,
      secondaryColor: sc,
      primaryText: pt,
      secondaryText: st,
    });
  },

  toggleMode: () => {
    const { mode } = get();

    set({ mode: mode == "Light" ? "Dark" : "Light" });
  },
}));

export default useTheme;
