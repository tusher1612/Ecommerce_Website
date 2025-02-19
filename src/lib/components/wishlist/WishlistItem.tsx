// WishlistItem Component - Displays a single product in the wishlist with an image, title, description, and a remove button.

import Image from "next/image";
import { Button } from "@/utilities/components/ui/button";
import { Product } from "@/utilities/types/product.types";

interface PropsType {
  item: Product;
  onRemove: (id: number) => void;
}

const WishlistItem = ({ item, onRemove }: PropsType) => {
  return (
    <li className="p-2 my-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Image
          src={item.image}
          alt={item.title}
          height={100}
          width={100}
          className="rounded-lg"
        />

        <div>
          <p className="font-bold line-clamp-2">{item.title}</p>
          <div
            className="line-clamp-1 text-sm mt-2 font-light"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Button
          className="bg-red-500 hover:bg-red-300 rounded-full px-4 py-2 text-white text-sm"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </Button>
      </div>
    </li>
  );
};

export default WishlistItem;
