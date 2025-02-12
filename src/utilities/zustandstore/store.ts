'use client'  // Ensures this code only runs on the client-side (not during server-side rendering)

import { create } from 'zustand'  // Zustand is a state management library for React
import { persist, createJSONStorage } from 'zustand/middleware'  // Middleware for persisting state to storage
import { Product } from '@/utilities/types/types'  // Import Product type for type safety
import { CartState, WishlistState, User } from '@/utilities/types/types'  // Import custom types for Cart and Wishlist state
import { getSession } from 'next-auth/react'  // Function to retrieve session data (from NextAuth)

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],  // The array to store products in the cart (for regular users)
      sessionCart: [],  // A session-specific cart (for tracking cart items for the session, especially for admins)
      
      // Function to add a product to the cart
      addProduct: async (product: Product) => {
        const session = await getSession();  // Get session data (user details)

        set((state) => {
          const newCart = [...state.cart, product];  // Create a new array by adding the product to the existing cart

          // If the logged-in user is an admin, only update sessionCart
          if (session?.user.name === 'admin') {
            return { 
              sessionCart: newCart  // Update sessionCart with the new product
            };
          } else {
            // For regular users, update both the cart and sessionCart
            return { 
              cart: newCart,  // Update the user's cart
              sessionCart: newCart  // Update the sessionCart to sync with the cart
            };
          }
        });
      },

      // Function to remove a product from the cart
      removeProduct: (id: number) => {
        const index = get().cart.findIndex((p) => p.id === id);  // Find the product by its ID
        if (index === -1) return;  // If the product is not found, do nothing

        // Remove the product from the cart and sessionCart
        set((state) => {
          const newCart = [...state.cart];
          newCart.splice(index, 1);  // Remove the product from the cart array

          return { 
            cart: newCart,  // Update the cart state
            sessionCart: newCart  // Update the sessionCart as well
          };
        });
      },

      // Function to clear the cart on logout
      clearCart: () => {
        set({ cart: [] });  // Set the cart to an empty array, effectively clearing it
      },
    
    }),
    {
      name: 'cart-storage',  // Name of the persisted store
      storage: createJSONStorage(() => sessionStorage),  // Store the cart data in sessionStorage, so it persists during session
    }
  )
);

// Wishlist Store to manage the user's wishlist state
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      wishlist: {},  // Object to track the wishlist items (key-value pairs where key is product ID)
      sessionWishlist: {},  // Object to track the wishlist items for the current session (separate from the main wishlist)
      
      // Function to add a product to the wishlist
      addToWishlist: async (id) => {
        const session = await getSession();  // Get session data (user details)

        set((state) => {
          // If the logged-in user is an admin, only update the sessionWishlist
          if (session?.user.name === "admin") {
            return {
              sessionWishlist: { ...state.sessionWishlist, [id]: true },  // Mark the product as in the wishlist
            };
          } else {
            // For regular users, update both the wishlist and sessionWishlist
            return {
              wishlist: { ...state.wishlist, [id]: true },  // Mark the product as in the wishlist for the user
              sessionWishlist: { ...state.sessionWishlist, [id]: true },  // Mark the product as in the sessionWishlist
            };
          }
        });
      },

      // Function to remove a product from the wishlist
      removeFromWishlist: (id) =>
        set((state) => {
          const updatedWishlist = { ...state.wishlist };
          delete updatedWishlist[id];  // Remove the product from the wishlist object

          return {
            wishlist: updatedWishlist,  // Update the main wishlist
            sessionWishlist: updatedWishlist,  // Update the session wishlist to match
          };
        }),

      // Function to toggle the wishlist status of a product
      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: { ...state.wishlist, [id]: !state.wishlist[id] },  // Toggle the value for this product ID in the wishlist
          sessionWishlist: { ...state.sessionWishlist, [id]: !state.sessionWishlist[id] },  // Toggle the value for this product ID in sessionWishlist
        })),

      // Function to clear the wishlist
      clearWishlist: () => {
        set({ wishlist: {} });  // Clear all items from the wishlist
      },
    }),
    {
      name: "wishlist-storage",  // Name of the persisted store
      storage: createJSONStorage(() => sessionStorage),  // Store the wishlist data in sessionStorage
    }
  )
);
