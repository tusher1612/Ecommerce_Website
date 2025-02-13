'use client'

import Basket from "@/utilities/components/Basket/Basket";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  
  } from "@/utilities/components/ui/dialog"
import { useState } from "react";
  




const  BasketMoadal=()=>{

const [isOpen,setisOpen]=useState(true)


    return (
      
     <Dialog open={isOpen}
     
     onOpenChange={(isOpen)=> {
        if(!isOpen){
            setisOpen(false)
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
export default  BasketMoadal;