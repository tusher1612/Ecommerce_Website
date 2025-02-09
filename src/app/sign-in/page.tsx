'use client'

import { signIn , getSession} from "next-auth/react";
import { handleLogin } from "../actions/handleLogin";
import { useState } from "react";
import { useCartStore,useWishlistStore } from "@/store/store";
import { useSession } from "next-auth/react";

const SignIn =()=> {


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
    <h1 className="text-3xl font-bold mb-6">Sign in</h1>
    <form 
      onSubmit={handleLogin} 
      className="flex flex-col gap-4 bg-gray-700 shadow-lg p-6 rounded-lg w-80"
    >
      <input 
        name="email" 
        type="email" 
        placeholder="Email" 
        required 
        className="p-2 text-black rounded-md"
      />
      <input 
        name="password" 
        type="password" 
        placeholder="Password" 
        required 
        className="p-2 text-black rounded-md"
      />
      <button  
        type="submit" 
        className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600"
      >
        Login
      </button>

    </form>

  </div>
  );
}
export default SignIn;