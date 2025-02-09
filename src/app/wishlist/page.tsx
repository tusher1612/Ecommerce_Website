"use client";

import { useWishlistStore } from "@/store/store"; // Zustand store
import { fetchProducts } from "@/app/utils/actions"; // Fetch function
import { groupProductsById } from "@/app/utils/wishlistActions"; // Grouping function
import { Product } from "@/types/types";
import { HeartIcon } from "lucide-react";
import WishlistItem from "@/components/WishlistItem"; // WishlistItem component
// import { useSession } from "next-auth/react"
import { getSession } from "../utils/getSession";

const  WishlistPage= async() => {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const sessionWishlist=useWishlistStore((state)=>state.sessionWishlist)
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
   const session=getSession();
  // Fetch products synchronously using useState with function initializer
  const products = await fetchProducts();

  // Compute grouped products dynamically instead of storing in state
  const grouped = groupProductsById(products, wishlist);
  const  sessionGrouped=groupProductsById(products,sessionWishlist)

  return (
    <div className="max-w-2xl mx-auto p-5">
      <div className="flex items-center gap-2.5">
        <HeartIcon size={50} />
        <span className="text-4xl font-bold">
          Welcome {session?.user?.name ? `! ${session.user.name}` : "!"}
        </span>
      </div>
      <p className="m-5">
        Review your Wishlist and please explore our other products when you are ready!
      </p>

      {session ? (
        <ul className="space-y-5 divide-y-2">
          {Object.keys(sessionGrouped).map((id) => {
            const numericId = parseInt(id);
            const item = sessionGrouped[numericId][0]; // First item of the group

            return <WishlistItem key={numericId} item={item} onRemove={removeFromWishlist} />;
          })}
        </ul>
      ) : (
        <ul className="space-y-5 divide-y-2">
          {Object.keys(grouped).map((id) => {
            const numericId = parseInt(id);
            const item = grouped[numericId][0]; // First item of the group

            return <WishlistItem key={numericId} item={item} onRemove={removeFromWishlist} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
