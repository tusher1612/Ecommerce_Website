import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getSession } from "next-auth/react";
import {
  CartState,
  ModalState,
  Product,
  WishlistState,
} from "../types/product.types";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      sessionCart: [],

      addProduct: async (product: Product) => {
        const session = await getSession();

        set((state) => {
          const newCart = [...state.cart, product];

          if (session?.user.name === "admin") {
            return {
              sessionCart: newCart,
            };
          } else {
            return {
              cart: newCart,
              sessionCart: newCart,
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
            sessionCart: newCart,
          };
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage",
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
              sessionWishlist: {
                ...state.sessionWishlist,
                [product.id]: product,
              },
            };
          } else {
            return {
              wishlist: { ...state.wishlist, [product.id]: product },
              sessionWishlist: {
                ...state.sessionWishlist,
                [product.id]: product,
              },
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

export const useModalStore = create<ModalState>()(
  persist(
    (set) => ({
      wishlistModalOpen: false,
      basketModalOpen: false,

      openWishlistModal: () => {
        console.log("Opening wishlist modal");
        set(() => ({ wishlistModalOpen: true }));
      },

      closeWishlistModal: () => {
        console.log("Closing wishlist modal");
        set(() => ({ wishlistModalOpen: false }));
      },

      toggleWishlistModal: () => {
        set((state) => {
          console.log("Toggling wishlist modal", !state.wishlistModalOpen);
          return { wishlistModalOpen: !state.wishlistModalOpen };
        });
      },

      openBasketModal: () => {
        console.log("Opening basket modal");
        set(() => ({ basketModalOpen: true }));
      },

      closeBasketModal: () => {
        console.log("Closing basket modal");
        set(() => ({ basketModalOpen: false }));
      },

      toggleBasketModal: () => {
        set((state) => {
          console.log("Toggling basket modal", !state.basketModalOpen);
          return { basketModalOpen: !state.basketModalOpen };
        });
      },
    }),
    {
      name: "modal-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
