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

export type WishlistState = {
  wishlist: { [key: number]: boolean }; // Tracks wishlist state per product
  sessionWishlist: { [key: number]: boolean }; // Fixed typo: sessionWishist → sessionWishlist

  addToWishlist: (id: number) => Promise<void>; // Async function to add a product
  removeFromWishlist: (id: number) => void; // Function to remove a product
  toggleWishlist: (id: number) => void; // Function to toggle wishlist item
   // Async function to fetch user wishlist
  clearWishlist: () => void; // Function to clear the wishlist
};


export type wishlist ={
  wishlist: { [key: number]: boolean };
  sessionWishist:{[key:number]:boolean};
}

export interface WishlistItemProps {
  item: Product;
  onRemove: (id: number) => void;
}