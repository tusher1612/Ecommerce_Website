// Importing necessary utilities and components
import { getTotal, groupbyId } from "@/utilities/utils/busketActions"; // Import utility functions for calculating totals and grouping products
import { useCartStore } from "@/utilities/store/store"; // Import custom hook to access the cart store
import AddToCart from "../cart/AddToCart"; // Import AddToCart component for adding products to the cart
import Image from "next/image"; // Import Image component from Next.js for image optimization
import { Button } from "../ui/button"; // Import custom Button component for styling and functionality
import { useSession } from "next-auth/react"; // Import useSession hook to manage user session
import { useRouter } from "next/navigation"; // Import useRouter hook for navigation between pages

// Basket component where the cart items are displayed
const Basket = () => {
  // Accessing the cart and session cart from the global store using the custom hook
  const cart = useCartStore((state) => state.cart); // The user's cart data
  const sessionCart = useCartStore((state) => state.sessionCart); // The session-based cart data (if any)
  
  // Accessing the session data from NextAuth (e.g., current logged-in user)
  const { data: session } = useSession();
  
  // Router hook to navigate between pages programmatically
  const router = useRouter();

  // Calculate the total price for the current user's cart and session cart
  const total = getTotal(cart); // Total price for the user's cart
  const grouped = groupbyId(cart); // Grouping the products in the user's cart by product ID

  const totalSession = getTotal(sessionCart); // Total price for the session cart (if applicable)
  const groupedSession = groupbyId(sessionCart); // Grouping the products in the session cart by product ID

  // Handle checkout process
  const handleCheckout = () => {
    // If the user is not logged in, redirect them to the sign-in page
    if (!session) {
      router.push("/sign-in"); // Redirect to sign-in page
    } else {
      router.push("/payment"); // If logged in, proceed to payment page
    }
  };

  // Function to render cart items, grouped by product ID
  const renderCartItems = (groupedItems: any, totalAmount: number) => (
    <div className="max-w-2xl mx-auto p-5"> 
      {/* Wrapper div for styling and padding */}
      
      <ul className="space-y-5 divide-y-2"> 
        {/* List of grouped cart items */}
        {Object.keys(groupedItems).map((id) => { 
          // Iterating through each grouped item by its ID
          const numericId = parseInt(id); // Convert string ID to number
          const item = groupedItems[numericId][0]; // Get the first item from the group (could be multiple items)
          const groupTotal = getTotal(groupedItems[numericId]); // Calculate the total price for the group

          return (
            <li key={numericId} className="p-2 my-2 flex items-center justify-center">
              {/* List item for each product in the cart */}
              
              <Image src={item.image} alt={item.title} height={100} width={100} />
              {/* Display product image using Next.js optimized Image component */}
              
              <div className="flex space-x-4 pl-4">
                {/* Product details and actions */}
                <div>
                  <p className="line-clamp-2 font-bold">{item.title}</p>
                  {/* Product title with a font-bold class and text clamping for overflow */}
                  <div className="line-clamp-1 text-sm mt-2 font-light" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                  {/* Product description with text clamping */}
                </div>
                <div>
                  <p><AddToCart product={item} /></p>
                  {/* Render the AddToCart component for each product, passing the product as a prop */}
                  <p className="font-bold text-lg my-4">USD {groupTotal}</p>
                  {/* Display the total price for this product group */}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex mb-3">
        {/* Display total cart value */}
        <p className="font-bold text-walmart-default mt-4 ml-auto text-xl">Total: USD {totalAmount}</p>
      </div>

      <Button className="bg-walmart-default rounded-full  px-6 py-4 md:px-8  md:py-6 w-full text-center hover:bg-blue-400" onClick={handleCheckout}>
        Checkout
      </Button>
      {/* Button to trigger checkout; directs to sign-in if not logged in */}
    </div>
  );

  // Conditional rendering based on whether the user is logged in (session exists)
  return session ? renderCartItems(groupedSession, totalSession) : renderCartItems(grouped, total);
  // If logged in, render session cart items; if not, render regular cart items
};

export default Basket;
