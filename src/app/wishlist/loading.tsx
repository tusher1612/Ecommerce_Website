import { Skeleton } from "@/components/ui/skeleton";
import { Loader, LoaderPinwheel } from "lucide-react";

const  Loading=()=>{

    return (
        <div className="flex items-center justify-center h-screen ">
          <Loader className="h-40 w-40"/>
          {/* Loading 2 .... */}
        </div>
       
    )
}

export default Loading;