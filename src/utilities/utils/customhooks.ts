/**
 * Custom Hook: `useCartQuantity`
 * Computes the quantity of a specific product in the cart using `useMemo` for optimization.
 * Recalculates only when `cart` or `productId` changes by filtering matching items and returning the count.
 *
 * @param {Product[]} cart - The array of products currently in the cart.
 * @param {number} productId - The ID of the product to count in the cart.
 * @returns {number} - The total count of the specified product in the cart.
 */

"use client";

import { useMemo } from "react";
import { Product } from "../types/product.types";

export const useCartQuantity = (cart: Product[], productId: number) => {
  return useMemo(() => {
    return cart.filter((item) => item.id === productId).length;
  }, [cart, productId]);
};
