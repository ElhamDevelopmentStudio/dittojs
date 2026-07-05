import { create } from "zustand"

type AppState = {
  projectName: string
  setProjectName: (projectName: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  projectName: "Ditto React App",
  setProjectName: (projectName) => set({ projectName }),
}))
