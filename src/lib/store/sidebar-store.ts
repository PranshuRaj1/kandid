
import { create } from 'zustand';

//  Define the interface for our store's state and actions
interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
}

//  store
export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true, // The initial state
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })), // The action to update the state
}));