import { create } from 'zustand';

export type TModalMode =
  | 'ALERT'
  | 'DELETE'
  | 'LOGIN'
  | 'APPROVE_REVIEW'
  | 'REPORT';

interface ModalState {
  $isOpen: boolean;
  mode: TModalMode | null;
  contentProps?: any;
  openModal: (mode: TModalMode, contentProps?: any) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  $isOpen: false,
  mode: null,
  contentProps: {},
  openModal: (mode, contentProps) => {
    console.log(contentProps);
    set({ $isOpen: true, mode, contentProps });
  },
  closeModal: () => set({ $isOpen: false, mode: null, contentProps: {} }),
}));

export default useModalStore;
