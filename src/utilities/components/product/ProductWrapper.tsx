"use client";

import { useState, useEffect } from "react";
import WishlistHeartIcon from "../wishlist/WishlistHeartIcon";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import FrontPageAddToCart from "../cart/FrontPageAddToCart";
import { Product } from "@/utilities/types/product.types";
import { fetchAllProducts, searchProducts } from "@/utilities/api/product";

type PropsType = {
  initialProducts: Product[];
  query?: string;
};

const ProductWrapper = ({ initialProducts, query }: PropsType) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(12); // Number of products per page

  // Fetch products based on the current limit
  const loadProducts = async (): Promise<void> => {
    if (isLoading) return; // Prevent multiple clicks while loading
    setIsLoading(true); // Set loading state

    try {
      const newProducts = query
        ? await searchProducts(query, limit) // Pass limit for pagination
        : await fetchAllProducts(limit); // Pass limit for pagination

      setProducts(newProducts); // Update the products list with fetched data
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Load products when the limit changes
  useEffect(() => {
    loadProducts(); // Load products when limit is updated
  }, [limit, query]); // Add query to dependency to reload on search

  // Handle next page click (Increase limit)
  const handleNextPage = () => {
    setLimit((prevLimit) => prevLimit + 12); // Increment limit by 12
  };

  // Handle previous page click (Decrease limit)

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">
        {query ? `Search Results for "${query}"` : "All Products"}
      </h1>

      {query && products.length === 0 ? (
        <p className="flex items-center justify-center h-screen">No products found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <div
                className="border p-4 rounded-lg shadow-lg flex flex-col h-[390px] cursor-pointer"
                key={product.id}
              >
                <span className="flex ml-auto gap-1 z-8">
                  <WishlistHeartIcon product={product} />
                  <FrontPageAddToCart product={product} />
                </span>
                <Link href={`/products/${product.id}`} passHref>
                  <div className="flex flex-col h-[380px] cursor-pointer">
                    <div className="relative h-56 w-full flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="rounded-lg object-contain"
                      />
                    </div>
                    <p className="text-md font-bold text-black">${product.price}</p>
                    <h2 className="text-sm font-semibold mt-1 line-clamp-1 h-[3rem] overflow-hidden">
                      {product.title}
                    </h2>
                    <p className="-mt-5 text-gray-600 text-sm">
                      <span className="font-semibold text-black pr-2">Category:</span>
                      {product.category}
                    </p>
                    <div className="flex place-items-center gap-1">
                      <div className="flex flex-1 items-center">
                        <StarIcon color="yellow" fill="yellow" />
                        <p className="mt-4 text-gray-600 text-sm mb-2">{product.rating}</p>
                      </div>
                      <div>
                        <p className="mt-4 text-gray-600 text-sm">
                          <span className="font-bold">Stock:</span> {product.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {isLoading && <p className="text-center text-gray-500 mt-4">Loading products...</p>}

          <div className="flex justify-center items-center m-4">
         
            <button
              onClick={handleNextPage}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
             Load More
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductWrapper;
