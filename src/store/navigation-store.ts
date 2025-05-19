import { create } from 'zustand'

type NavigationStore = {
  previousPath: string | null
  currentPath: string | null
  setPaths: (current: string) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  previousPath: null,
  currentPath: null,
  setPaths: (current) =>
    set((state) => ({
      previousPath: state.currentPath,
      currentPath: current,
    })),
}))