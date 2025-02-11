
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
  products: Product[] | undefined,  // Allow products to be undefined
  wishlist: Record<number, boolean>
): Record<string, Product[]> => {

  // Ensure products is always an array before calling reduce
  if (!Array.isArray(products)) {
    console.error("Error: products is not a valid array", products);
    return {};  // Return an empty object to prevent errors
  }

  return products.reduce((accumulator: Record<string, Product[]>, currentProduct: Product) => {
    const productId = currentProduct.id;

    if (wishlist[productId]) {
      if (!accumulator[productId]) {
        accumulator[productId] = [];
      }
      accumulator[productId].push(currentProduct);
    }

    return accumulator;
  }, {});
};



  