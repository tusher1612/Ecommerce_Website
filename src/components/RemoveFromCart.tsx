"use client"

import { Product } from "@/types/types"
import { useCartStore } from "@/store/store"
import { Button } from "./ui/button"

 const  RemoveFromCart =( {product}:{product:Product})=>{
const RemoveCart=useCartStore((state)=> state.removeProduct)
   return (
<Button className="bg-walmart-default  hover:bg-walmart-default/50" onClick={()=>RemoveCart(product.id)}>-</Button>


    )
}
export default RemoveFromCart;