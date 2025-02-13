/**
 * WishListModalWrapper is a modal component that displays the user's wishlist. 
 * It retrieves wishlist items from Zustand state management, groups them by product ID, 
 * and displays them inside a dialog. Users can remove items from the wishlist while keeping 
 * the modal open. The component adapts based on whether the user is logged in, showing 
 * session-specific wishlist data if available.
 */

'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/utilities/components/ui/dialog";
import { useModalStore, useWishlistStore } from "@/utilities/zustandstore/store"; 
import { groupProductsById } from "@/utilities/utils/wishlistActions"; 
import WishlistItem from "@/utilities/components/wishlist/WishlistItem"; 
import { useSession } from "next-auth/react";

const WishListModalWrapper = () => {
  const isOpen = useModalStore((state) => state.wishlistModalOpen);
  const closeWishlistModal = useModalStore((state) => state.closeWishlistModal);
  
  const wishlist = useWishlistStore((state) => state.wishlist);
  const sessionWishlist = useWishlistStore((state) => state.sessionWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const { data: session } = useSession();

  const grouped = groupProductsById(wishlist);
  const sessionGrouped = groupProductsById(sessionWishlist);
  
  return (
    <Dialog open={isOpen} onOpenChange={closeWishlistModal}>
      <DialogContent className="bg-white text-grey p-5 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>WishList</DialogTitle>
          <DialogDescription>
            <div className="max-w-2xl mx-auto p-5">
              {session ? (
                <ul className="space-y-5 divide-y-2">
                  {Object.keys(sessionGrouped).map((id) => {
                    const numericId = parseInt(id);
                    const items = sessionGrouped[numericId];

                    return Array.isArray(items) ? items.map((item) => (
                      <WishlistItem
                        key={item.id}
                        item={item}
                        onRemove={removeFromWishlist}
                      />
                    )) : null;
                  })}
                </ul>
              ) : (
                <ul className="space-y-5 divide-y-2">
                  {Object.keys(grouped).map((id) => {
                    const numericId = parseInt(id);
                    const items = grouped[numericId];

                    return Array.isArray(items) ? items.map((item) => (
                      <WishlistItem
                        key={item.id}
                        item={item}
                        onRemove={removeFromWishlist}
                      />
                    )) : null;
                  })}
                </ul>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WishListModalWrapper;
