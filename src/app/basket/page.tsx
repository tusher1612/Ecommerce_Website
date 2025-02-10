'use client'

import Basket from "@/utilities/components/Basket";
import { ShoppingCart} from "lucide-react";
import { useSession } from "next-auth/react"
const   BasketPage=()=>{
     const {data:session ,status}=useSession();
    return (
        <div className="flex flex-col items-center justify-center pt-5 w-full">
     <div className="flex items-center gap-2.5"><ShoppingCart size={50} /><span className="text-4xl font-bold">Welcome!  {session?.user?.name}</span></div>
     <p className="m-5"> Review your cart and please checkout when you are ready!</p>
        
     <Basket/>
        </div>
    )
}
export default BasketPage; 