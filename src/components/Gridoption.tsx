import { cn } from "@/lib/utils"
import Image,{StaticImageData } from "next/image"
import Link from "next/link"
import { Gridprops } from "@/types/types"


 const  Gridoption=({image,title,className}:Gridprops)=>{
    return (
     <Link href={{
        pathname:'/products',
        // query:{q:title}
     }}
     
     className={cn('grid-options relative' , className)}
     >
     <h2 className=" text-lg font-semibold">{title}</h2>
     {image && 
     <Image
     src={image}
     alt={title}
     layout="fill"
     className="object-cover opacity-20  rounded-md"
    
     
     />
     
     }
     
     </Link>
    )
}
export default  Gridoption;