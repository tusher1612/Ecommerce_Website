import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";



const  Loading=()=>{

    return (
        <div className="flex items-center justify-center h-screen space-y-3">
       <Loader className="h-50 w-50"/>
        </div>
       
    )
}
export default Loading;