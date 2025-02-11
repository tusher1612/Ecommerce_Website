import { Product } from "../types/types";
import WishlistHeartIcon from "./WishlistHeartIcon";
import AddToCart2 from "./FrontaddToCart";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import Link from "next/link";

// Define the props interface explicitly without React.FC
interface ProductWrapperProps {
  products: Product[];
  query?: string;
}

// Define the component with explicit props typing
const ProductWrapper = ({ products, query }: ProductWrapperProps) => {
  const isSearchActive = Boolean(query);

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">
        {isSearchActive ? `Search Results for "${query}"` : "All Products"}
      </h1>
      {isSearchActive && products.length === 0 ? (
        <p className="flex items-center justify-center h-screen">No products found for "{query}"</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <div className="border p-4 rounded-lg shadow-lg flex flex-col h-[390px] cursor-pointer" key={product.id}>
              <span className="flex ml-auto gap-1 z-8">
                <WishlistHeartIcon productId={product.id} />
                <AddToCart2 product={product} />
              </span>
              <Link href={`/products/${product.id}`} passHref>
                <div className="flex flex-col h-[380px] cursor-pointer">
                  <div className="relative h-56 w-full flex-shrink-0">
                    <Image src={product.image} alt={product.title} fill className="rounded-lg object-contain" />
                  </div>
                  <p className="text-md font-bold text-black">${product.price}</p>
                  <h2 className="text-sm font-semibold mt-1 line-clamp-1 h-[3rem] overflow-hidden">{product.title}</h2>
                  <p className="-mt-5 text-gray-600 text-sm">
                    <span className="font-semibold text-black pr-2">Category:</span>{product.category}
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
      )}
      {isSearchActive && <footer className="mt-auto">Footer Content</footer>}
    </div>
  );
}

export default ProductWrapper;
