
import { Product } from "@/utilities/types/types"; // Importing the Product type definition
import { BASE_URL } from "@/utilities/config/constant";

export type DummyJsonProduct = {
  id: number;
  title: string;
  images: string[];
  category:string;
  price:number;
  description:string;
  rating:number;
  stock:number;

};

  
// Function to fetch product data from an external API
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // Fetch product data from the dummy API with a limit of 10 products
    const res = await fetch(`${BASE_URL}/products?limit=10`);

    // If the response is not OK (e.g., 404, 500 errors), throw an error
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    // Parse the response body as JSON
    const data = await res.json();

    // Transform the fetched product data into a structured format
    return data.products.map((product:DummyJsonProduct) => {
      // Ensure images is defined and has at least one element
      const image = Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : "";  // Fallback to an empty string if no image available

      console.log(image); // Log the image URL to debug

      return {
        id: product.id, // Unique product ID
        title: product.title, // Product title/name
        image: image, // First image of the product (or fallback if missing)
        category: product.category, // Product category
        price: product.price, // Product price
        description: product.description, // Product description
        rating: product.rating, // Customer rating
        stock: product.stock, // Available stock quantity
      };
    });

  } catch (error) {
    // Log error in case of failure and return an empty array
    console.error("Error fetching products:", error);
    return [];
  }
};




// ===================== 🔴 COMMENTED OUT CODE 🔴 ===================== //
// The following search function was commented out because the API 
// now handles the search functionality itself, making this redundant.

// export const querySearch = async (query: string) => {
//   // Fetch all products
//   const products = await fetchProducts();

//   // Filter products that match the search query
//   const queryProducts = products.filter((product) =>
//     query
//       .toLowerCase()
//       .split(" ") // Allow searching by multiple words
//       .every((word) => 
//         product.title.toLowerCase().includes(word) ||
//         product.category.toLowerCase().includes(word)
//       )
//   );

//   return queryProducts;
// };
// =================================================================== //

// Function to fetch a single product based on its ID
export const SingleProduct = async (productId: number) => {
  // Fetch all products
  const products = await fetchProducts();

  // Find the product by its ID (returns `null` if not found)
  const product = products.find((product) => product.id === productId) ?? null;

  // Return the product object
  return product;
};






  