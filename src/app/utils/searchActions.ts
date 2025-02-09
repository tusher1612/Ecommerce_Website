/**
 * Function: `querySearch`
 * This function searches for products based on the provided query string.
 * It fetches data from the DummyJSON API and returns a formatted list of products.
 *
 * @param {string} query - The search term used to filter products.
 * @returns {Promise<Array>} - A promise resolving to an array of product objects.
 */
export const querySearch = async (query: string) => {
  try {
    // Fetch product data from the API using the search query
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);

    // Check if the API request was successful
    if (!res.ok) {
      throw new Error("Failed to fetch products"); // Throw an error if response is not OK
    }

    // Parse the JSON response from the API
    const data = await res.json();
    
    // Map the API response data into a structured format
    return data.products.map((product: any) => ({
      id: product.id,                          // Extract product ID
      title: product.title,                    // Extract product title
      image: product.images?.[0] || "",        // Extract the first image (or empty string if none)
      category: product.category,              // Extract product category
      price: product.price,                    // Extract product price
      description: product.description,        // Extract product description
      rating: product.rating,                  // Extract product rating
      stock: product.stock,                    // Extract available stock quantity
    }));
    
  } catch (error) {
    // Log any errors that occur during fetching or processing
    console.error("Error fetching products:", error);

    // Return an empty array if an error occurs
    return [];
  }
};
