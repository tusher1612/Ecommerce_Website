/**
 * Function: `querySearch`
 * Fetches products based on a query string from an API and returns a structured list of products.
 * 
 * @param {string} query - The search term used to filter products.
 * @returns {Promise<Array>} - A promise resolving to an array of product objects, each containing:
 *   - `id` (number): The product ID.
 *   - `title` (string): The product title.
 *   - `image` (string): The first product image URL.
 *   - `category` (string): The product category.
 *   - `price` (number): The product price.
 *   - `description` (string): The product description.
 *   - `rating` (number): The product rating.
 *   - `stock` (number): The available stock quantity.
 */

import { BASE_URL } from "../config/constant";
import { DummyJsonProduct } from "./ProductFetch";

export const querySearch = async (query: string) => {
  try {
    const res = await fetch(`${BASE_URL}/products/search?q=${query}`);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return data.products.map((product: DummyJsonProduct) => ({
      id: product.id,
      title: product.title,
      image: product.images[0],
      category: product.category,
      price: product.price,
      description: product.description,
      rating: product.rating,
      stock: product.stock,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
