"use client";

/*
  WishlistHeartIcon is a React component that manages the wishlist functionality for a product.
  It uses Zustand for state management to store wishlist items either persistently or for a session.
  The component displays a heart icon that users can click to toggle a product's wishlist status.
  If the product is already in the wishlist, clicking removes it; otherwise, it is added.
*/

import { useWishlistStore } from "@/utilities/zustandstore/store";
import { HeartIcon } from "lucide-react";
import { Product } from "@/utilities/types/product.types";

const WishlistHeartIcon = ({ product }: { product: Product }) => {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const sessionWishlist = useWishlistStore((state) => state.sessionWishlist);

  //console.log("Wishlist Data:", wishlist);
  //console.log("Session Wishlist Data:", sessionWishlist);

  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const handleWishlistClick = () => {
    const isInWishlist = wishlist[product.id] || sessionWishlist[product.id];

    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      console.log("Added to wishlist:", product);
    }
  };

  return (
    <div onClick={handleWishlistClick} className="cursor-pointer">
      <HeartIcon
        className="flex-end"
        fill={
          wishlist[product.id] || sessionWishlist[product.id] ? "red" : "none"
        }
        stroke="black"
      />
    </div>
  );
};

export default WishlistHeartIcon;
