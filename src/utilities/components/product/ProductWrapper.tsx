/**
 * ProductWrapper displays a list of products in a grid format.
 * It supports searching, filtering, and rendering product cards with details.
 * Each product includes an image, title, price, category, rating, stock,
 * a wishlist button, and an add-to-cart button. Clicking a product navigates to its details page.
 */

"use client";

import WishlistHeartIcon from "../wishlist/WishlistHeartIcon";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import FrontPageAddToCart from "../cart/FrontPageAddToCart";
import { Product } from "@/utilities/types/product.types";

type PropsType = {
  products: Product[];
  query?: string;
};

const ProductWrapper = ({ products, query }: PropsType) => {
  const isSearchActive = Boolean(query);

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">
        {isSearchActive ? `Search Results for "${query}"` : "All Products"}
      </h1>
      {isSearchActive && products.length === 0 ? (
        <p className="flex items-center justify-center h-screen">
          No products found for {query}
        </p>
      ) : (
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
                  <p className="text-md font-bold text-black">
                    ${product.price}
                  </p>
                  <h2 className="text-sm font-semibold mt-1 line-clamp-1 h-[3rem] overflow-hidden">
                    {product.title}
                  </h2>
                  <p className="-mt-5 text-gray-600 text-sm">
                    <span className="font-semibold text-black pr-2">
                      Category:
                    </span>
                    {product.category}
                  </p>
                  <div className="flex place-items-center gap-1">
                    <div className="flex flex-1 items-center">
                      <StarIcon color="yellow" fill="yellow" />
                      <p className="mt-4 text-gray-600 text-sm mb-2">
                        {product.rating}
                      </p>
                    </div>
                    <div>
                      <p className="mt-4 text-gray-600 text-sm">
                        <span className="font-bold">Stock:</span>{" "}
                        {product.stock}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductWrapper;
