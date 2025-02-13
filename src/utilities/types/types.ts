import {StaticImageData } from "next/image"

export type Product = {
    id: number;
    title: string;
    image: string;
    category:string;
    price:number;
    description:string;
    rating:number;
    stock:number;

  };
export type User= {
  email:'string'
}
 export  type Params = {
    id: string; // Ensure it's a string because Next.js dynamic routes provide strings
  };

  export type props = {
      //params:ParsedUrlQuery,
      searchParams:{
          q:string
      } 
  }
  

 export  type Gridprops= {
    title:string,
    image?:string | StaticImageData  ,
    className?:string
     
 
}

export interface CartState {
  sessionCart:Product[];
  cart: Product[];
  addProduct: (product: Product) => void
  removeProduct: (id: number) => void
  clearCart:()=>void
 
}

export type WishlistState= {
  wishlist: Record<number, Product>; // Store product objects instead of just IDs
  sessionWishlist: Record<number, Product>;

  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (id: number) => void;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}


export type wishlist ={
  wishlist: { [key: number]: boolean };
  sessionWishist:{[key:number]:boolean};
}

export interface WishlistItemProps {
  item: Product;
  onRemove: (id: number) => void;
}