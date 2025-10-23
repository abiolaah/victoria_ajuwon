import { create } from "zustand";

export interface ModalStoreInterface {
  itemId?: string;
  profileId?: string;
  type: "skill" | "project";
  isOpen: boolean;
  openModal: (
    itemId: string,
    type: "skill" | "project",
    profileId?: string
  ) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  itemId: undefined,
  type: "skill",
  isOpen: false,
  openModal: (
    itemId: string,
    type: "skill" | "project",
    profileId?: string
  ) => {
    // Force the Type to be exactly "movie" or "tv"
    const validType = type === "project" ? "project" : "skill";
    return set({
      isOpen: true,
      itemId,
      profileId,
      type: validType,
    });
  },
  closeModal: () =>
    set({
      isOpen: false,
      itemId: undefined,
      profileId: undefined,
      // Don't reset Type here to maintain it for future uses
    }),
}));

export default useInfoModal;
