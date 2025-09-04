import { create } from "zustand"


//  Define the interface for our store's state and actions
interface ThemeState {
  isDark: boolean
  toggleTheme: () => void
}


// store
export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}))
