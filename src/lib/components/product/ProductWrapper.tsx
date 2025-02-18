"use client";

import { useEffect, useState } from "react";
import WishlistHeartIcon from "../wishlist/WishlistHeartIcon";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import FrontPageAddToCart from "../cart/FrontPageAddToCart";
import { Product } from "@/utilities/types/product.types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type PropsType = {
  initialProducts: Product[];
};

const ProductWrapper = ({ initialProducts }: PropsType) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [limit, setLimit] = useState<number>(12);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  console.log("Initialize limit", limit);

  useEffect(() => {
    const limitFromParams = parseInt(searchParams.get("limit") || "12", 10);
    const queryFromParams = searchParams.get("query") || "";

    if (limitFromParams !== limit) {
      setLimit(limitFromParams);
    }
    setQuery(queryFromParams);
  }, [searchParams]);

  const updateSearchQuery = ({ limit }: { limit: number }) => {
    const updateLimit = limit === 0 || limit === undefined ? 1 : limit;
    const params = new URLSearchParams(searchParams);
    params.set("limit", updateLimit.toString());
    params.set("query", query);
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(updatedPath);
  };

  // Handle next page click (Increase limit)


  const handleLoadMore = () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);
  
    const newLimit = limit + 12;
    setLimit(newLimit);
  
    setTimeout(() => {
      updateSearchQuery({ limit: newLimit });
      setLoading(false);
    }, 1000); // Simulating a delay for smooth loading effect
  };

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">
        {query ? `Search Results for "${query}"` : "All Products"}
      </h1>

      {query && initialProducts.length === 0 ? (
        <p className="flex items-center justify-center h-screen">
          No products found
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialProducts.map((product: Product) => (
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
                    <h2 className="text-sm font-semibold mt-1 line-clamp-2 h-[3rem] overflow-hidden">
                      {product.title}
                    </h2>
                    <p className="-mt-2 text-gray-600 text-sm">
                      <span className="font-semibold text-black pr-2">
                        Category:
                      </span>
                      {product.category}
                    </p>
                    <div className="flex place-items-center gap-1">
                      <div className="flex flex-1 items-center">
                        <StarIcon color="yellow" fill="yellow" />
                        <p className="mt-1 text-gray-600 text-sm mb-2">
                          {product.rating}
                        </p>
                      </div>
                      <div>
                        <p className="mt-1 text-gray-600 text-sm">
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
          {loading && (
  <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
    <div className="animate-spin rounded-full border-4 border-blue-500 border-t-transparent h-12 w-12"></div>
  </div>
)}

          <div className="flex justify-center items-center m-4">
  <button
    onClick={handleLoadMore}
    disabled={loading}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
  >
    {loading ? (
      <>
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5 mr-2"></span>
        Loading...
      </>
    ) : (
      "Load More"
    )}
  </button>
</div>

        </>
      )}
    </div>
  );
};

export default ProductWrapper;
