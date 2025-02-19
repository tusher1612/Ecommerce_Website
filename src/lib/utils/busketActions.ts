import { Product } from "../types/product.types";

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
  const total = products.reduce(
    (acc, currentProduct) => acc + currentProduct.price,
    0
  );
  return parseFloat(total.toFixed(2));
};
