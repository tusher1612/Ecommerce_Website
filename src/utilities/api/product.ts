// import { BASE_URL } from "../config/constant";
import { Product } from "../types/product.types";

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
 * Fetches a list of products from the API with a limit of 10.
 * Returns an array of products mapped to the Product type.
 */
const fetchAllProducts = async (limit: number): Promise<Product[]> => {
  try {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}`
    );
    console.log('response for load more', res);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return data.products.map((product: DummyJsonProduct) => {
      const image =
        Array.isArray(product.images) && product.images.length > 0
          ? product.images[0]
          : "";

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
 * Fetches details of a single product by its ID.
 * Returns the product object with relevant details.
 */
const fetchProductById = async (productId: number) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch product details");
    }

    const data = await res.json();

    const image =
      Array.isArray(data.images) && data.images.length > 0
        ? data.images[0]
        : "";

    return {
      id: data.id,
      title: data.title,
      image: image,
      category: data.category,
      price: data.price,
      description: data.description,
      rating: data.rating,
      stock: data.stock,
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

/**
 * Searches for products based on a query string.
 * Returns an array of matching products.
 */
const searchProducts = async (query: string, limit: number): Promise<Product[]> => {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${query}&limit=${limit}`
    );
    console.log('response for load more', res);

    if (!res.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await res.json();

    return data.products.map((product: DummyJsonProduct) => ({
      id: product.id,
      title: product.title,
      image: product.images[0] || "",
      category: product.category,
      price: product.price,
      description: product.description,
      rating: product.rating,
      stock: product.stock,
    }));
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};



export { fetchProductById, fetchAllProducts, searchProducts };
