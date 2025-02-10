// Enable Client-side Rendering in Next.js (since hooks should only run on the client)
'use client'

import { Product } from '@/utilities/types/types'; // Importing the Product type definition
import { useMemo } from 'react'; // Importing useMemo to optimize performance

/**
 * Custom Hook: `useCartQuantity`
 * This hook calculates the quantity of a specific product in the cart.
 *
 
 */
export const useCartQuantity = (cart: Product[], productId: number) => {
  
  // Using useMemo to optimize performance by memoizing the computed quantity.
  return useMemo(() => {
    
    // Filter the cart to find items matching the given productId and return the count
    return cart.filter((item) => item.id === productId).length;

  }, [cart, productId]); // Dependencies: Recalculate only when `cart` or `productId` changes
};
