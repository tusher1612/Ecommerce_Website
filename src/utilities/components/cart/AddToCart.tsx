// This component handles adding products to the cart, displaying the current quantity, 
// and allowing users to increment or remove items from the cart based on session status. 
// It uses Zustand for state management and NextAuth for session handling.



"use client";

import { Product } from "@/utilities/types/types";
import { useCartStore } from "@/utilities/zustandstore/store";
import { Button } from "../ui/button";
import RemoveFromCart from "./RemoveFromCart";
import { useCartQuantity } from "@/utilities/utils/customhooks";
import { useSession } from "next-auth/react";

const AddToCart = ({ product }: { product: Product }) => {
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
        <RemoveFromCart product={product} />
        <p>{itemCount}</p>
        <Button
          className="bg-walmart-default text-white hover:bg-walmart-default/50"
          onClick={() => handleProduct(itemCount, product.stock)}
        >
          +
        </Button>
      </div>
    ) : (
      <Button className="bg-walmart-default rounded hover:bg-blue-500" onClick={() => addProduct(product)}>
        Add to cart
      </Button>
    )
  );

  return session ? renderCartUI(sessionItem) : renderCartUI(howManyItem);
};

export default AddToCart;
