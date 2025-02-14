import { create } from 'zustand';
import { v4 } from 'uuid';

export type BlockType = 'numbers' | 'operators' | 'display' | 'calculate';

export interface IBlockItem {
  id: string;
  blockType: BlockType;
  isOnCanvas: boolean;
}

interface ConstructState {
  sidebarList: IBlockItem[];
  canvasList: IBlockItem[];
  isRuntime: boolean;
  addToCanvas: (block: IBlockItem, position: number) => void;
  deleteFromCanvas: (block: IBlockItem) => void;
  toggleRuntime: (isRuntime: boolean) => void;
}

export const useConstructStore = create<ConstructState>((set) => ({
  sidebarList: [
    { id: v4(), blockType: 'display', isOnCanvas: false },
    { id: v4(), blockType: 'operators', isOnCanvas: false },
    { id: v4(), blockType: 'numbers', isOnCanvas: false },
    { id: v4(), blockType: 'calculate', isOnCanvas: false },
  ],
  canvasList: [],
  isRuntime: false,
  
  addToCanvas: (block, position) =>
    set((state) => {
      const updBlock = { ...block, isOnCanvas: true };
      const newCanvasList = [...state.canvasList];
      if (updBlock.blockType === 'display') {
        newCanvasList.unshift(updBlock);
      } else if (position >= 0 && position < state.canvasList.length) {
        newCanvasList.splice(position, 0, updBlock);
      } else {
        newCanvasList.push(updBlock);
      }
      return {
        canvasList: newCanvasList,
        sidebarList: state.sidebarList.map((item) =>
          item.id === block.id ? { ...item, isOnCanvas: true } : item
        ),
      };
    }),

  deleteFromCanvas: (block) =>
    set((state) => ({
      canvasList: state.canvasList.filter((item) => item.blockType !== block.blockType),
      sidebarList: state.sidebarList.map((item) =>
        item.id === block.id ? { ...item, isOnCanvas: false } : item
      ),
    })),

  toggleRuntime: (isRuntime) => set({ isRuntime }),
}));