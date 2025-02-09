// Importing necessary components and types
import Image from "next/image"; // Next.js Image component for optimized image rendering
import { Button } from "@/components/ui/button"; // Custom Button component used in the UI
import { Product } from "@/types/types"; // Product type, assumed to be a structure for product data
import { WishlistItemProps } from '@/types/types' // WishlistItemProps type, defines the expected props for WishlistItem component

// WishlistItem component - Displays a single item in the wishlist
const WishlistItem = ({ item, onRemove }: WishlistItemProps) => {
  return (
    // List item for individual product display, styled with padding and flex layout
    <li className="p-2 my-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Product image */}
        <Image
          src={item.image} // Image URL from the item object
          alt={item.title} // Alt text, using the product title for better accessibility
          height={100} // Fixed height for the image
          width={100} // Fixed width for the image
          className="rounded-lg" // Adding rounded corners to the image
        />
        
        <div>
          {/* Product title displayed in bold with line-clamping for truncating long titles */}
          <p className="font-bold line-clamp-2">{item.title}</p>
          
          {/* Product description - line clamped and safely rendered HTML */}
          <div
            className="line-clamp-1 text-sm mt-2 font-light" // Small, light text with some margin-top for spacing
            dangerouslySetInnerHTML={{ __html: item.description }} // Used for rendering raw HTML content from the product description
          />
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        {/* Remove button for the item in the wishlist */}
        <Button
          className="bg-red-500 hover:bg-red-300 rounded-full px-4 py-2 text-white text-sm" // Styling the button (rounded, red background, small text)
          onClick={() => onRemove(item.id)} // Calling onRemove function passed from the parent component, passing the item's ID
        >
          Remove {/* Button label */}
        </Button>
      </div>
    </li>
  );
}

export default WishlistItem; // Exporting the component to be used in other parts of the app
