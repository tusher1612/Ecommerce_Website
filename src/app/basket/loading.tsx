import { Skeleton } from "@/utilities/components/ui/skeleton";
import { Loader } from "lucide-react";



const  Loading=()=>{

    return (
        <div className="flex items-center justify-center h-screen space-y-3">
          <Loader className=" h-12 w-12  md:h-20  md:w-20"/>
        </div>
       
    )
}
export default Loading;