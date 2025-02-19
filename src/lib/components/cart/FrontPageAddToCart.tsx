// This component handles adding products to the cart from the front page. It checks the current session,
// displays the shopping cart icon, and allows users to add products to the cart or increment the quantity
// based on the stock availability, all while utilizing Zustand for state management.

"use client";
import { Product } from "@/utilities/types/product.types";
import { useCartStore } from "@/utilities/zustandstore/store";
import { useCartQuantity } from "@/utilities/utils/customhooks";
import { useSession } from "next-auth/react";
import { ShoppingCart } from "lucide-react";

const FrontPageAddToCart = ({ product }: { product: Product }) => {
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
  const renderCartUI = (itemCount: number) =>
    itemCount > 0 ? (
      <div className="flex space-x-5 items-center">
        {/* <RemoveFromCart product={product} />
        <p>{itemCount}</p> */}
        <p
          className="text-black hover:text-yellow-500"
          onClick={() => handleProduct(itemCount, product.stock)}
        >
          <ShoppingCart />
        </p>
      </div>
    ) : (
      <p
        className="text-black hover:text-yellow-500"
        onClick={() => addProduct(product)}
      >
        <ShoppingCart />
      </p>
    );

  return session ? renderCartUI(sessionItem) : renderCartUI(howManyItem);
};

export default FrontPageAddToCart;
