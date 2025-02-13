/**
 * Purpose:
 * Utility functions for managing products in the cart, specifically to group products by their ID 
 * and calculate the total price of all products in the cart.
 * 
 * - `groupById`: Groups products by their ID to efficiently manage cart items, especially in cases where 
 * the same product is added multiple times.
 * - `getTotal`: Calculates the total price of all products in the cart.
 * 
 * @params products: Product[] - An array of products in the cart.
 * @returns 
 *   - groupById: A record object where the keys are product IDs (as strings) and the values are arrays of Product objects.
 *   - getTotal: A number representing the total price of the products in the cart.
 * 
 * @example
 * const groupedProducts = groupById(cartProducts); // Groups products by their ID
 * const total = getTotal(cartProducts); // Gets the total price of the products
 */

import { Product } from "@/utilities/types/types";

/**
 * Groups products by their ID to manage cart items efficiently.
 * 
 * @params products: Product[] - An array of products in the cart.
 * @returns A record object where keys are product IDs (as strings) and values are arrays of Product objects.
 */
export const groupById = (product: Product[]): Record<string, Product[]> => {
  return product?.reduce(
    (accumulator: Record<string, Product[]>, currentProduct: Product) => {
      const productId = currentProduct.id;
      if (!accumulator[productId]) {
        accumulator[productId] = [];
      }
      accumulator[productId].push(currentProduct);
      return accumulator;
    },
    {}
  );
};


/**
 * Calculates the total price of all products in the cart.
 * 
 * @params products: Product[] - An array of products in the cart.
 * @returns A number representing the total price of the products in the cart, rounded to two decimal places.
 */
export const getTotal = (products: Product[]): number => {
  const total = products.reduce((acc, currentProduct) => acc + currentProduct.price, 0);
  return parseFloat(total.toFixed(2));
};
