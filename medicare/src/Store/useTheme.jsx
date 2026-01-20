import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  primaryColor,
  primaryText,
  secondaryColor,
  secondaryText,
} from "../Constants/Colors";

const useTheme = create(
  persist(
    (set, get) => ({
      mode: "light",
      primaryColor,
      secondaryColor,
      primaryText,
      secondaryText,
      saveMode: "#0F172A",

      toggleColors: (pc, sc, pt, st) => {
        set({
          primaryColor: pc,
          secondaryColor: sc,
          primaryText: pt,
          secondaryText: st,
        });
      },

      makeSaveMode: (val) => {
        set({ saveMode: val });
      },

      toggleMode: () => {
        const { mode } = get();
        set({ mode: mode === "light" ? "dark" : "light" });
      },
    }),
    {
      name: "theme-settings", //  ده اللي هيتخزن في localStorage
    }
  )
);

export default useTheme;
