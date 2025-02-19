export type Product = {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  stock: number;
};

export interface CartState {
  sessionCart: Product[];
  cart: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  clearCart: () => void;
}

export type WishlistState = {
  wishlist: Record<number, Product>;
  sessionWishlist: Record<number, Product>;

  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
};

export type wishlist = {
  wishlist: { [key: number]: boolean };
  sessionWishList: { [key: number]: boolean };
};

export type ModalState = {
  wishlistModalOpen: boolean;
  basketModalOpen: boolean;
  openWishlistModal: () => void;
  closeWishlistModal: () => void;
  toggleWishlistModal: () => void;
  openBasketModal: () => void;
  closeBasketModal: () => void;
  toggleBasketModal: () => void;
};
