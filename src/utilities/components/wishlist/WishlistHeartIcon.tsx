"use client"; // Indicates this component is to be used in a client-side environment with React

// Import necessary hooks and components
import { useWishlistStore } from "@/utilities/zustandstore/store"; // Custom hook to access the wishlist state in the global store
import { HeartIcon } from "lucide-react"; // Import the HeartIcon component for the wishlist button
 // Hook to access the current user's session
import { Product } from "@/utilities/types/types";
// WishlistComponent to manage and display the wishlist functionality
const WishlistHeartIcon = ({ product }: { product: Product }) => {
  // Access the wishlist states from the global store using the custom hook
  const wishlist = useWishlistStore((state) => state.wishlist); // Regular wishlist stored in the store
  const sessionWishlist = useWishlistStore((state) => state.sessionWishlist); // Wishlist stored for session-based users
  
  // Logging the current wishlist data (for debugging purposes)
  console.log("Wishlist Data:", wishlist);
  console.log("Session Wishlist Data:", sessionWishlist);

  // Accessing store functions for adding or removing items from the wishlist
  const addToWishlist = useWishlistStore((state) => state.addToWishlist); // Function to add items to the wishlist
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist); // Function to remove items from the wishlist

  

  // Function to handle the wishlist button click event
  const handleWishlistClick = () => {
    // Check if the product is already in the wishlist (either session or regular wishlist)
    const isInWishlist = wishlist[product.id] || sessionWishlist[product.id];
  
    // If the product is in the wishlist, remove it; otherwise, add it
    if (isInWishlist) {
      removeFromWishlist(product.id); // Remove the product from the wishlist
    } else {
      addToWishlist(product); // Pass the full product object
      console.log("Added to wishlist:", product); // Log the added product for debugging
    }
  };
  

  // Returning the heart icon button to toggle wishlist status
  return (
    <div onClick={handleWishlistClick} className="cursor-pointer">
      {/* Heart icon representing the wishlist button */}
      <HeartIcon
    className="flex-end" // Ensure the icon is positioned correctly
    fill={wishlist[product.id] || sessionWishlist[product.id] ? "red" : "none"} // If the product is in the wishlist, fill the heart icon with red, otherwise leave it empty
    stroke="black" // Set the stroke (outline) of the heart to black
  />
    </div>
  );
};

export default WishlistHeartIcon ; // Export the component for use in other parts of the app
