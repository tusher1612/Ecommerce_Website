

/**
 * Zustand Store for Cart and Wishlist Management
 *
 * This store manages the cart and wishlist functionality in a React application using Zustand.
 * 
 * - **Cart Management (`useCartStore`)**:
 *   - Stores both `cart` (for regular users) and `sessionCart` (for admin or session-based tracking).
 *   - Supports adding, removing, and clearing products from the cart.
 *   - Uses NextAuth's `getSession` to check if the user is an admin and modifies `sessionCart` accordingly.
 *   - Persists cart data using sessionStorage to maintain the cart during the session.
 *
 * - **Wishlist Management (`useWishlistStore`)**:
 *   - Stores `wishlist` (for regular users) and `sessionWishlist` (for session-based tracking).
 *   - Allows adding, removing, and toggling wishlist items.
 *   - Uses `getSession` to handle admin-specific session wishlist updates.
 *   - Persists wishlist data using sessionStorage.
 *
 * The store ensures a seamless user experience by persisting session-based data while maintaining efficient state updates.
 */

import { create } from 'zustand'  
import { persist, createJSONStorage } from 'zustand/middleware'  
import { Product } from '@/utilities/types/types'  
import { CartState, WishlistState} from '@/utilities/types/types'  
import { getSession } from 'next-auth/react'  

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],  
      sessionCart: [],  
      
      addProduct: async (product: Product) => {
        const session = await getSession();  

        set((state) => {
          const newCart = [...state.cart, product];  

          if (session?.user.name === 'admin') {
            return { 
              sessionCart: newCart  
            };
          } else {
            return { 
              cart: newCart,  
              sessionCart: newCart  
            };
          }
        });
      },

      removeProduct: (id: number) => {
        const index = get().cart.findIndex((p) => p.id === id);  
        if (index === -1) return;  

        set((state) => {
          const newCart = [...state.cart];
          newCart.splice(index, 1);  

          return { 
            cart: newCart,  
            sessionCart: newCart  
          };
        });
      },

      clearCart: () => {
        set({ cart: [] });  
      },
    
    }),
    {
      name: 'cart-storage',  
      storage: createJSONStorage(() => sessionStorage),  
    }
  )
);

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      wishlist: {},
      sessionWishlist: {},

      addToWishlist: async (product) => {
        const session = await getSession();

        set((state) => {
          if (session?.user.name === "admin") {
            return {
              wishlist: state.wishlist, // Ensure wishlist is returned
              sessionWishlist: { ...state.sessionWishlist, [product.id]: product },
            };
          } else {
            return {
              wishlist: { ...state.wishlist, [product.id]: product },
              sessionWishlist: { ...state.sessionWishlist, [product.id]: product },
            };
          }
        });
      },

      removeFromWishlist: (id) =>
        set((state) => {
          const updatedWishlist = { ...state.wishlist };
          delete updatedWishlist[id];

          const updatedSessionWishlist = { ...state.sessionWishlist };
          delete updatedSessionWishlist[id];

          return {
            wishlist: updatedWishlist,
            sessionWishlist: updatedSessionWishlist,
          };
        }),

      toggleWishlist: (product) =>
        set((state) => {
          const isInWishlist = Boolean(state.wishlist[product.id]);
          const updatedWishlist = { ...state.wishlist };
          const updatedSessionWishlist = { ...state.sessionWishlist };

          if (isInWishlist) {
            delete updatedWishlist[product.id];
            delete updatedSessionWishlist[product.id];
          } else {
            updatedWishlist[product.id] = product;
            updatedSessionWishlist[product.id] = product;
          }

          return {
            wishlist: updatedWishlist,
            sessionWishlist: updatedSessionWishlist,
          };
        }),

      clearWishlist: () => {
        set({ wishlist: {} });
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);









