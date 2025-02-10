
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
    products: Product[],                // List of products to group
    wishlist: Record<number, boolean>   // Wishlist object with product IDs as keys and boolean values
): Record<string, Product[]> => {

  // Using `reduce` to iterate over the products array and accumulate grouped products based on their IDs
  return products?.reduce((accumulator: Record<string, Product[]>, currentProduct: Product) => {

    const productId = currentProduct.id;  // Get the ID of the current product
  
    // Check if the product is in the wishlist using its ID
    if (wishlist[productId]) {

      // If the product is not already in the accumulator object, create a new entry with an empty array
      if (!accumulator[productId]) {
        accumulator[productId] = [];
      }

      // Push the current product into the corresponding array for this product ID in the accumulator
      accumulator[productId].push(currentProduct);
    }

    // Return the updated accumulator for the next iteration
    return accumulator;

  }, {});  // Initialize the accumulator as an empty object
};


  