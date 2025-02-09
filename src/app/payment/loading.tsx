import { Skeleton } from "@/components/ui/skeleton";
import { Loader, LoaderPinwheel } from "lucide-react";

const Loading=()=>{

    return (
        <div className="flex items-center justify-center h-screen ">
              <Loader className="h-32 w-32"/>
          {/* Loading 2 .... */}
        </div>
       
    )
}
export default Loading;