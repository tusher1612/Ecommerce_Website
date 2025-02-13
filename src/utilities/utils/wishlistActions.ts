
// Importing the Product type from the types directory
import { Product } from "@/utilities/types/types";

/**
 * Function: `groupProductsById`
 * 
 * This function groups products based on their IDs, filtering out the products
 * that are present in the wishlist. The final result is an object where 
 * the keys are product IDs, and the values are arrays of products with that ID.
 * 
 * @param {Product[]} products - The array of products to be grouped.
 * @param {Record<number, boolean>} wishlist - The wishlist where each product ID is mapped to a boolean.
 * @returns {Record<string, Product[]>} - An object where keys are product IDs, and values are arrays of products that are in the wishlist.
 */
export const groupProductsById = (
  wishlist: Record<number, Product> // Store products instead of boolean
): Record<string, Product[]> => {

  // Ensure wishlist is an object and not empty
  if (!wishlist || Object.keys(wishlist).length === 0) {
    console.log("Error: wishlist is empty or invalid", wishlist);
    return {};
  }

  return Object.values(wishlist).reduce((accumulator: Record<string, Product[]>, currentProduct: Product) => {
    const productId = currentProduct.id;

    // Check if the product exists in the wishlist (assuming it's the product object)
    if (currentProduct) {
      if (!accumulator[productId]) {
        accumulator[productId] = [];
      }
      accumulator[productId].push(currentProduct); // Use the product from the wishlist
    }

    return accumulator;
  }, {});
};




  