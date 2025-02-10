"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/utils/actions";
import Image from "next/image";
import { HeartIcon, StarIcon ,Loader} from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/types"; // Ensure correct import
import WishlistComponent from "@/components/Wishlist";
// import AddToCart from "@/components/AddToCart";
import AddToCart2 from "@/components/FrontaddToCart";


 const Allproduct = async ()=> {
  const products = await fetchProducts();


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div className="border p-4 rounded-lg shadow-lg flex flex-col h-[390px] cursor-pointer" key={product.id}>
        <span className="flex ml-auto gap-1  z-8  ">
        <WishlistComponent  productId={product.id}/> 
        <AddToCart2   product={product} />
        </span>
     
       
        <Link key={product.id} href={`/products/${product.id}`} passHref>
          <div className=" flex flex-col h-[380px] cursor-pointer">
            {/* Wishlist Toggle */}
           

            {/* Image */}
            <div className="relative h-56 w-full flex-shrink-0 ">
              <Image
                src={product.image}
                alt={product.title}
                fill
                // sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 23vw"
                className="rounded-lg object-contain"
              />
            </div>

            {/* Product Info */}
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
                <p className="mt-4 text-gray-600 text-sm ">
                  <span className="font-bold">Stock:</span> {product.stock}
                </p>
              </div>
            </div>
          </div>
        </Link>
        </div>
      ))}
    </div>
  );
}

export default Allproduct;