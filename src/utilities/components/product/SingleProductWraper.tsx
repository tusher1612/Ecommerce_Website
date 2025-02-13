/**
 * SingleProductWrapper displays detailed information about a single product. 
 * It includes the product image, title, description, price, rating, stock availability, 
 * and an "Add to Cart" button. A fallback image is used if the product image is missing.
 */


import Image from "next/image";
import demo from "@/public/images/demo.jpg"; // Fallback image
import { Star } from "lucide-react";
import AddToCart from "@/utilities/components/cart/AddToCart";
import { Product } from "../../types/types";

interface SingleProductWrapperProps {
  myProduct: Product; 
}

const SingleProductWrapper = ({ myProduct }: SingleProductWrapperProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6" key={myProduct.id}>
    
      <div className="w-full h-[200] md:w-1/2 flex justify-center">
        <Image
          src={myProduct.image || demo} 
          alt={myProduct.title || "Product Image"}
          width={300}
          height={300}
          className="rounded-lg shadow-lg object-cover"
        />
      </div>


      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">{myProduct.title}</h1>
        <p className="text-gray-600 ">{myProduct.description}</p>
        <p className="text-gray-600 font-semibold ">${myProduct.price}</p>
        <p className="text-gray-600 flex">
          <Star fill="yellow" stroke="yellow" />
          {myProduct.rating}
        </p>
        <p className="mt-4 text-gray-600 text-sm mb-2">
          <span className="font-bold">Stock:</span> {myProduct.stock}
        </p>
        <AddToCart product={myProduct} />
      </div>
    </div>
  );
};

export default SingleProductWrapper;
