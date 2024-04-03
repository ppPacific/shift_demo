import { create } from "zustand";
import { IShift } from "../components/Shift";

interface StoreState {
  apiData: IShift[] | null;
  setApiData: (data: IShift[]) => void;
}

export const useStore = create<StoreState>()((set) => ({
  apiData: null,
  setApiData: (data) => set({ apiData: data }),
}));

export default useStore;
