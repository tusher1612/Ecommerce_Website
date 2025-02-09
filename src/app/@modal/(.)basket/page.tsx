'use client'

import Basket from "@/components/Basket";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
  




const  BasketPage=()=>{
const router=useRouter();

const dialogdismiss =()=>{
    router.back()
}

    return (
      
     <Dialog open
     
     onOpenChange={(isOpen)=> {
        if(!isOpen){
            dialogdismiss();
        }
     }}
     >
 
  <DialogContent className="bg-white text-grey  p-5">
    <DialogHeader>
      <DialogTitle>Basket</DialogTitle>
      <DialogDescription>
      <Basket/>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

   
    )
}
export default  BasketPage;