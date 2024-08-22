import { create } from 'zustand';

export type TModalMode =
  | 'ALERT'
  | 'DELETE'
  | 'LOGIN'
  | 'APPROVE_REVIEW'
  | 'REPORT'
  | 'CONFIRM';

export interface IModalState {
  $isOpen: boolean;
  mode: TModalMode | null;
  contentProps?: any;
  openModal: (mode: TModalMode, contentProps?: any) => void;
  closeModal: () => void;
}

const useModalStore = create<IModalState>((set) => ({
  $isOpen: false,
  mode: null,
  contentProps: {},
  openModal: (mode, contentProps) => {
    set({ $isOpen: true, mode, contentProps });
  },
  closeModal: () => set({ $isOpen: false, mode: null, contentProps: {} }),
}));

export default useModalStore;
