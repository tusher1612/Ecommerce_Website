'use client'

import Image from "next/image"
import logo from "@/utilities/public/images/walmart-logo-png-27987.png"
import { Grid2X2CheckIcon, Grid2X2Icon, Heart, LogIn, LogOut, LogOutIcon, LucideGrid2x2Plus, Search, ServerIcon, ShoppingCart, TouchpadOff, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent } from "react";
import { useCartStore, useWishlistStore } from "@/utilities/store/store"
// import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"
import { getSession } from "@/utilities/utils/getSession"


// import { handleFormSubmit } from "@/app/actions/submissionAction"

 const  Header=()=>{
 
  const session=getSession();
   //console.log("This is session data",session); 
   //console.log(status)
  const router=useRouter()
  const cart=useCartStore((state)=>state.cart)
  const sessionCart=useCartStore((state)=>state.sessionCart);
  // console.log(cart)
  // const userCart=useCartStore((state)=>state.fetchUserCart)
  // console.log(userCart(session?.user.email ?? ""));  // Use an empty string as fallback

  const wishlist=useWishlistStore((state)=>state.wishlist);
  const wishlistLength= Object.keys(wishlist).length;
  //getting session based wishlist 
  const sessionWishlist=useWishlistStore((state)=>state.sessionWishlist)
  const sessionWishlistLength=Object.keys(sessionWishlist).length;
  console.log('SessionWIshlistLenth testing',sessionWishlistLength)

 const  handleFormSubmit=(e:FormEvent<HTMLFormElement>)=>{
        //tacking unnecessary handling 
        e.preventDefault();
        const searchInput=e.currentTarget.searchInput.value;
        //console.log(searchInput)
        router.push(`/products?q=${searchInput}`)
    }

 const handleBusket= ()=> {
   
 }
    const handleLogout = () => {
      useCartStore.getState().clearCart(); // Clear cart state in Zustand
      useWishlistStore.getState().clearWishlist(); // Clear wishlist state in Zustand
    
      // Call NextAuth's signOut to log out the user
      signOut({ redirect: false }); // Set redirect to false if you don't want an automatic page refresh
    };
 

    return (
        <header className="bg-walmart-default flex md:flex-row flex-col items-center px-10 py-7 space-x-5 gap-5">
   
     <Link href='/' className="md:mb-0 mb-5 mr-16">
         <Image
          alt="walmart Logo"
          src={logo}
          height={150}
          width={150}   
         />
     </Link>
        
  <form onSubmit={handleFormSubmit}  className="flex items-center  bg-white  w-full md:w-2/4  rounded-full md:gap-x-7">
        <input name="searchInput" type="text" autoComplete="off" placeholder="Search Everything ... " className="flex-1 bg-white outline-none 
        placeholder:text-sm ml-2  focus:bg-white focus:outline-none focus:ring-0" />
        <button type="submit" className="bg-yellow-300 rounded-full px-2 w-10 h-10 cursor-pointer"><Search/></button>
  </form>

  <div className=" flex space-x-3 pl-10">
  <Link href='/products' className="hidden lg:flex  font-bold items-center   text-white text-sm space-x-1.5">
  <Grid2X2CheckIcon size={20} />
  <p>All products</p>
  </Link>


  <Link href="/wishlist" className="relative flex items-center font-bold text-white text-sm md:mt-0 mt-5">
  <div className="relative">
    <Heart size={20} />
    {/* Wishlist count badge */}
    <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
      {session ? sessionWishlistLength : wishlistLength}
    </span>
  </div>

</Link>






  <Link href='/basket' className=" flex  font-bold items-center   text-white text-sm space-x-1.5 md:mt-0 mt-5">
  <ShoppingCart size={20} />
  <span className="bg-yellow-300 rounded-full h-4 w-4  mb-6 ml-16  absolute text-center">{session? sessionCart.length :cart.length }</span>

  </Link>

  <div className=" flex  font-bold items-center   text-white text-sm space-x-1.5 md:mt-0 mt-5 ">
  {
    !session ?  (<Link href='/sign-in' className="ml-1 cursor-pointer"><User size={20} /></Link> ): (<LogOutIcon className="ml-1 cursor-pointer" size={20} onClick={handleLogout } />)
  }
  </div>



  </div>

        </header>
    )
}

export default Header;