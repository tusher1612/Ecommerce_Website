import { querySearch } from '@/app/utils/searchActions';
import Image from "next/image";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/types";
import WishlistComponent from "@/components/Wishlist";
import AddToCart2 from '@/components/FrontaddToCart';

const Search = async ({ searchParams }: { searchParams: { q: string } }) => {
  const { q } = searchParams;

  if (!q) {
    return <p>Please enter a search query</p>;
  }

  // Fetch the products based on the query
  const queryProduct = await querySearch(q);
  console.log(queryProduct); // Make sure the search results are correct

  return (
    <div className="min-h-screen p-6 flex flex-col">
      {/* Container for the products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {queryProduct.length > 0 ? (
          queryProduct.map((product: Product) => (
            <div
              className="border p-4 rounded-lg shadow-lg flex flex-col justify-between cursor-pointer"
              key={product.id}
            >
             <span className="flex flex-col mr-auto gap-2 absolute">
        <WishlistComponent  productId={product.id}/> 
        <AddToCart2   product={product} />
        </span>

              <Link href={`/product/${product.id}`}>
                <div className="pb-4 rounded-lg flex flex-col">
                  <div className="relative h-64 w-full flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 23vw"
                      className="rounded-lg object-contain"
                    />
                  </div>

                  <p className="text-xl font-bold text-black">${product.price}</p>
                  <h2 className="text-sm font-semibold mt-2 line-clamp-1 h-[3rem] overflow-hidden">
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
                      <p className="mt-4 text-gray-600 text-sm mb-2">
                        <span className="font-bold">Stock:</span> {product.stock}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className='flex items-center justify-center h-screen'>No products found for "{q}"</p>
        )}
      </div>
      {/* Footer should always be at the bottom */}
      <footer className="mt-auto">Footer Content</footer>
    </div>
  );
};

export default Search;
