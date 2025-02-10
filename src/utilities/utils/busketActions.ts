import { Product } from "@/utilities/types/types"; // Importing the Product type definition

// Function to group products by their ID to manage items in the cart
export const groupbyId = (product: Product[]): Record<string, Product[]> => {
  
  // Using the `reduce` function to group products based on their ID
  return product?.reduce(
    (accumulator: Record<string, Product[]>, currentProduct: Product) => {
      
      // Extract the product ID
      const productId = currentProduct.id;

      // If the product ID does not exist in the accumulator, initialize it as an empty array
      if (!accumulator[productId]) {
        accumulator[productId] = [];
      }

      // Push the current product into the appropriate group based on its ID
      accumulator[productId].push(currentProduct);

      // Return the updated accumulator object
      return accumulator;

    }, 
    {} // Initial value: an empty object to store grouped products
  );
};

// ==================================================================== //
//                          CART TOTAL FUNCTION                         //
// ==================================================================== //

/**
 * Function to calculate the total price of all products in the cart.
 * @param {Product[]} products - An array of product objects.
 * @returns {number} - The total price rounded to 2 decimal places.
 */
export const getTotal = (products: Product[]): number => {

  // Using `reduce` to accumulate the total price of all products
  const total = products.reduce((acc, currentProduct) => {
    return acc + currentProduct.price; // Add each product's price to the accumulator
  }, 0); // Initial accumulator value set to 0

  // Convert the total price to a float with two decimal places
  return parseFloat(total.toFixed(2));
};
