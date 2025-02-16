// This component represents the header section of the website. It includes a logo, search bar, 
// links to products, wishlist, cart, and login/logout functionality. The component utilizes Zustand 
// for state management and NextAuth for user authentication. Modals are used for the wishlist and basket.

'use client'

import Image from "next/image"
import logo from "@/public/images/logo.png"
import { Grid2X2CheckIcon, Heart, LogOutIcon, Search, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent } from "react";
import { useSession } from "next-auth/react"
import { useCartStore, useModalStore, useWishlistStore } from "@/utilities/zustandstore/store"
import BasketModal from "@/utilities/components/Basket/BasketModal"
import WishListModalWrapper from "../wishlist/WishlistModalWrapper"
import { signOut } from "next-auth/react"

const Header = () => {
  const  wishlistModalOpen = useModalStore((state) => state.wishlistModalOpen);
  const  basketModalOpen  = useModalStore((state) => state.basketModalOpen);
  const  openWishlistModal=useModalStore((state) => state.toggleWishlistModal);
  const openBasketModal =useModalStore((state) => state.toggleBasketModal);
  
  const { data: session } = useSession();
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const wishlistLength = Object.keys(wishlist).length;
  const sessionWishlist = useWishlistStore((state) => state.sessionWishlist);
  const sessionWishlistLength = Object.keys(sessionWishlist).length;
  const sessionCart = useCartStore((state) => state.sessionCart);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = e.currentTarget.searchInput.value;
    router.push(`/products?q=${searchInput}`);
  }

  const handleLogout = () => {
    useCartStore.getState().clearCart();
    useWishlistStore.getState().clearWishlist();
    signOut({ redirect: false });
  }

  return (
    <header className="bg-walmart-default flex md:flex-row flex-col items-center px-10 py-7 space-x-5 gap-5">
      <Link href='/' className="md:mb-0 mb-5 mr-16">
        <Image alt="walmart Logo" src={logo} height={150} width={150} />
      </Link>

      <form onSubmit={handleFormSubmit} className="flex items-center bg-white w-full md:w-2/4 rounded-full md:gap-x-7">
        <input name="searchInput" type="text" autoComplete="off" placeholder="Search Everything ..." className="flex-1 bg-white outline-none placeholder:text-sm ml-2 focus:bg-white focus:outline-none focus:ring-0" />
        <button type="submit" className="bg-yellow-300 rounded-full px-2 w-10 h-10 cursor-pointer"><Search /></button>
      </form>

      <div className="flex space-x-3 pl-10">
        <Link href='/products' className="hidden lg:flex font-bold items-center text-white text-sm space-x-1.5">
          <Grid2X2CheckIcon size={20} />
          <p>All products</p>
        </Link>

        <div className="relative flex items-center font-bold text-white text-sm md:mt-0 mt-5 cursor-pointer">
          <div className="relative">
            <Heart size={20} onClick={openWishlistModal}  className="cursor-pointer" />
            {wishlistModalOpen && <WishListModalWrapper />}
            <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {session ? sessionWishlistLength : wishlistLength}
            </span>
          </div>
        </div>

        <div className="flex font-bold items-center text-white text-sm space-x-1.5 md:mt-0 mt-5 cursor-pointer">
          <ShoppingCart onClick={openBasketModal} size={20} className="cursor-pointer" />
          {basketModalOpen && <BasketModal />}
          <span className="bg-yellow-300 rounded-full h-4 w-4 mb-6 ml-16 absolute text-center">{session ? sessionCart.length : cart.length}</span>
        </div>

        <div className="flex font-bold items-center text-white text-sm space-x-1.5 md:mt-0 mt-5">
          {
            !session ? 
            (<Link href='/sign-in' className="ml-1 cursor-pointer"><User size={20} /></Link>) :
            (<LogOutIcon className="ml-1 cursor-pointer" size={20} onClick={handleLogout} />)
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
