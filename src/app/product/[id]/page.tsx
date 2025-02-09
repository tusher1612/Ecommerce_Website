import { SingleProduct } from "@/app/utils/actions";
import Image from "next/image";
import demo from "@/public/images/demo.jpg"; // Fallback image
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import AddToCart from "@/components/AddToCart";
import { Params } from "@/types/types";


 const  Product= async({ params }: { params: Params })=> {
  const productId = Number(params.id); // Convert to number
  const myProduct = await SingleProduct(productId);

  // Handle case where product is not found
  if (!myProduct) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6" key={myProduct.id}>
      {/* Left Side - Product Image */}
      <div className="w-full h-[200] md:w-1/2 flex justify-center">
        <Image
          src={myProduct.image || demo} // Use product image or fallback
          alt={myProduct.title || "Product Image"}
          width={300}
          height={300}
          className="rounded-lg shadow-lg object-cover"
        />
      </div>

      {/* Right Side - Product Details */}
      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">{myProduct.title}</h1>
        <p className="text-gray-600 ">{myProduct.description}</p>
        <p className="text-gray-600 font-semibold ">${myProduct.price}</p>
        <p className="text-gray-600 flex"><Star fill="yellow" stroke="yellow"/>{myProduct.rating} </p>
        <p className="mt-4 text-gray-600 text-sm mb-2"><span className="font-bold">Stock:</span> {myProduct.stock}</p>
        <AddToCart product={myProduct}/>
      </div>
    
    </div>
  );
}

  export default  Product;