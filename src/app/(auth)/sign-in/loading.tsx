
import { Loader } from "lucide-react";

const  Loading=()=>{

    return (
        <div className="flex items-center justify-center h-screen ">
           <Loader className=" h-12 w-12 md:h-20  md:w-20"/>
          {/* Loading 2 .... */}
        </div>
       
    )
}

export default Loading;