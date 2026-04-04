import { create } from 'zustand';
import type { Task } from '../types/Tyeps';

interface TaskState {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    isModalOpen: boolean,
    openModal: (task?: Task) => void;
    closeModal: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectTaske: Task | null;
    IsEdit: boolean;
    setSelectTaske: (task: Task | null, IsEdit: boolean) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    isDarkMode: false,
    selectTaske: null,
    IsEdit: false,
    setSelectTaske: (task) => set({ selectTaske: task, IsEdit: task !== null }),
    searchQuery: '',
    isModalOpen: false,
    setSearchQuery: (query) => set({ searchQuery: query }),
    openModal: (task) => set({ isModalOpen: true, selectTaske: task }),
    closeModal: () => set({ isModalOpen: false, IsEdit: false, selectTaske: null }),
    toggleDarkMode: () => set((state) => {
        const isDark = !state.isDarkMode;
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return { isDarkMode: isDark };
    }),
}));