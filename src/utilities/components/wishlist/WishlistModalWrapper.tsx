'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/utilities/components/ui/dialog";
//import { fetchProducts } from "@/utilities/Product/ProductFetch"; // Assuming this fetches products
//import { Product } from "@/utilities/types/types"; // Assuming this defines the Product type
import { useWishlistStore } from "@/utilities/zustandstore/store"; // Zustand store
import { groupProductsById } from "@/utilities/utils/wishlistActions"; // Grouping function
import WishlistItem from "@/utilities/components/wishlist/WishlistItem"; // WishlistItem component
import { useSession } from "next-auth/react";

const WishListModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(true);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const sessionWishlist = useWishlistStore((state) => state.sessionWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const { data: session } = useSession();

 
  // Group products dynamically instead of storing them in state
  const grouped = groupProductsById( wishlist);
  const sessionGrouped = groupProductsById( sessionWishlist);


  console.log("grouped Product",grouped);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  };




  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
  <DialogContent className="bg-white text-grey p-5 max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>WishList</DialogTitle>
      <DialogDescription>
        <div className="max-w-2xl mx-auto p-5">
          {session ? (
            <ul className="space-y-5 divide-y-2">
              {Object.keys(sessionGrouped).map((id) => {
                const numericId = parseInt(id);
                const items = sessionGrouped[numericId]; // Get all items in the group

                // Ensure items is an array before calling map
                if (Array.isArray(items)) {
                  return items.map((item) => (
                    <WishlistItem
                      key={item.id}
                      item={item}
                      onRemove={removeFromWishlist} // Remove product but keep dialog open
                    />
                  ));
                } else {
                  return null; // Return null if items is not an array
                }
              })}
            </ul>
          ) : (
            <ul className="space-y-5 divide-y-2">
              {Object.keys(grouped).map((id) => {
                const numericId = parseInt(id);
                const items = grouped[numericId]; // Get all items in the group

                // Ensure items is an array before calling map
                if (Array.isArray(items)) {
                  return items.map((item) => (
                    <WishlistItem
                      key={item.id}
                      item={item}
                      onRemove={removeFromWishlist} // Remove product but keep dialog open
                    />
                  ));
                } else {
                  return null; // Return null if items is not an array
                }
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
