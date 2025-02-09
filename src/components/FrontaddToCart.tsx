"use client";

import { Product } from "@/types/types";
import { useCartStore } from "@/store/store";
import { Button } from "./ui/button";
import RemoveFromCart from "./RemoveFromCart";
import { useCartQuantity } from "@/app/utils/hooks";
import { useSession } from "next-auth/react";
import { PlusIcon } from "lucide-react";

const AddToCart2 = ({ product }: { product: Product }) => {
  const { data: session } = useSession();
  const cart = useCartStore((state) => state.cart);
  const sessionCart = useCartStore((state) => state.sessionCart);
  const addProduct = useCartStore((state) => state.addProduct);
  
  const howManyItem = useCartQuantity(cart, product.id);
  const sessionItem = useCartQuantity(sessionCart, product.id);

  const handleProduct = (itemNum: number, productStock: number) => {
    if (itemNum < productStock) {
      addProduct(product);
    } else {
      alert("Stock exceeding!");
    }
  };

  // Function to render Add to Cart UI
  const renderCartUI = (itemCount: number) => (
    itemCount > 0 ? (
      <div className="flex space-x-5 items-center">
        {/* <RemoveFromCart product={product} />
        <p>{itemCount}</p> */}
        <p
          className="text-black hover:text-yellow-500" 
          onClick={() => handleProduct(itemCount, product.stock)}
        >
          <PlusIcon/>
        </p>
      </div>
    ) : (
      <p  className="text-black hover:text-yellow-500" onClick={() => addProduct(product)}>
       <PlusIcon/>
      </p>
    )
  );

  return session ? renderCartUI(sessionItem) : renderCartUI(howManyItem);
};

export default AddToCart2;
