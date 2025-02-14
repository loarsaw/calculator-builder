import { create } from 'zustand';

interface CalcState {
  prevValue: string | null;
  nextValue: string;
  operator: string | null;
  addNum: (num: string) => void;
  operation: (op: string) => void;
  calculation: () => void;
  reset: () => void;
}

export const useCalcStore = create<CalcState>((set) => ({
  prevValue: null,
  nextValue: '0',
  operator: null,

  addNum: (num) =>
    set((state) => {
      if (state.nextValue.length >= 17) return state;
      if (num === '.' && state.nextValue.includes('.')) return state;
      if (state.nextValue === '0' && num === '0') return state;
      if (state.nextValue === '0' && num !== '0' && num !== '.') {
        return { nextValue: num };
      }
      return { nextValue: state.nextValue + num };
    }),

  operation: (op) =>
    set((state) => ({
      operator: op,
      prevValue: state.nextValue,
      nextValue: '0',
    })),

  calculation: () =>
    set((state) => {
      if (state.operator === '/' && (state.prevValue === '0' || state.nextValue === '0')) {
        return { nextValue: 'Не определено' };
      }
      if (state.prevValue && state.nextValue) {
        return {
          nextValue: String(eval(state.prevValue + state.operator + state.nextValue)),
          prevValue: null,
          operator: null,
        };
      }
      return state;
    }),

  reset: () => set({ nextValue: '0' }),
}));
