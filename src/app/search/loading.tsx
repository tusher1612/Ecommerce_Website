import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";



const Loading =()=>{

    return (
        <div className="flex items-center justify-center  w-full h-screen ">
       <Loader className="h-40 w-40"/>
       {/* Loading 1....  */}
        </div>
       
    )
}
export default  Loading ;