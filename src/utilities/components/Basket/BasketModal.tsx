//Basket modal


'use client'

import Basket from "@/utilities/components/Basket/Basket";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/utilities/components/ui/dialog";
import { useModalStore } from "@/utilities/zustandstore/store";

const BasketModal = () => {
  // Get modal open state from Zustand store
  const isOpen = useModalStore((state) => state.basketModalOpen);
  // Get function to close modal from Zustand store
  const closeModal = useModalStore((state) => state.closeBasketModal);
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      console.log("Modal closed");
      closeModal();  
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white text-grey p-5 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Basket</DialogTitle>
          <DialogDescription>
            <Basket />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BasketModal;
