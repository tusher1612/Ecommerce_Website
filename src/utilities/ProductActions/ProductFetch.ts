/**
 * Purpose:
 * This code defines functions to fetch product data from an external API, transform the data into a specific format, 
 * and provide a way to query and fetch single products based on their ID. It uses TypeScript types to ensure the 
 * structure of the product data.
 * 
 * @params None
 * @returns An array of Product objects for fetchProducts and a single product object or null for SingleProduct
 * 
 * @example
 * const products = await fetchProducts(); // Fetches an array of products
 * const product = await SingleProduct(1); // Fetches a product by ID
 */

import { Product } from "@/utilities/types/types"; // Importing the Product type definition
import { BASE_URL } from "@/utilities/config/constant";

export type DummyJsonProduct = {
  id: number;
  title: string;
  images: string[];
  category: string;
  price: number;
  description: string;
  rating: number;
  stock: number;
};

/**
 * Fetches products from an external API and transforms the data into a structured format.
 * 
 * @params None
 * @returns A promise that resolves to an array of Product objects.
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // Fetch product data from the dummy API with a limit of 10 products
    const res = await fetch(`${BASE_URL}/products?limit=10`);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return data.products.map((product: DummyJsonProduct) => {
      const image = Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : "";

      //console.log(image); // Log the image URL to debug

      return {
        id: product.id,
        title: product.title,
        image: image,
        category: product.category,
        price: product.price,
        description: product.description,
        rating: product.rating,
        stock: product.stock,
      };
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};




/**
 * Fetches a single product based on the provided product ID.
 * 
 * @params productId: number - The ID of the product to fetch.
 * @returns A promise that resolves to a single Product object or null if not found.
 */
export const SingleProduct = async (productId: number) => {
  const products = await fetchProducts();
  const product = products.find((product) => product.id === productId) ?? null;
  return product;
};
