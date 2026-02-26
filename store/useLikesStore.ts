import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from '../data/items';


interface LikesStore {
  likedItems: Item[];
  swipeHistory: string[];
  addLike: (item: Item) => void;
  removeLike: (itemId: string) => void;
  addToHistory: (itemId: string) => void;
  isLiked: (itemId: string) => boolean;
  wasSwiped: (itemId: string) => boolean;
  clearHistory: () => void;
  getUniqueItems: (items: Item[]) => Item[];
}

export const useLikesStore = create<LikesStore>()(
  persist(
    (set, get) => ({
      likedItems: [],
      swipeHistory: [],

      addLike: (item) => {
        const { likedItems, isLiked } = get();
        if (!isLiked(item.id)) {
          set({ likedItems: [...likedItems, item] });
        }
      },

      removeLike: (itemId) => {
        const { likedItems } = get();
        set({
          likedItems: likedItems.filter(item => item.id !== itemId)
        });
      },

      addToHistory: (itemId) => {
        const { swipeHistory, wasSwiped } = get();
        if (!wasSwiped(itemId)) {
          set({ swipeHistory: [...swipeHistory, itemId] });
        }
      },

      isLiked: (itemId) => {
        return get().likedItems.some(item => item.id === itemId);
      },

      wasSwiped: (itemId) => {
        return get().swipeHistory.includes(itemId);
      },

      clearHistory: () => {
        set({ swipeHistory: [] });
      },

      getUniqueItems: (items) => {
        const { swipeHistory } = get();
        return items.filter(item => !swipeHistory.includes(item.id));
      },
    }),
    {
      name: 'likes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
