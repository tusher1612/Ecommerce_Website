import { fetchProducts } from "@/utilities/utils/fetchactions";
import { Product } from "@/utilities/types/types";
import WishlistComponent from "@/utilities/components/WishlistComponent";

const  WishlistPage = async()=> {
    const products:Product[]=await fetchProducts();
    return (
     <WishlistComponent products={products} />
    )
    }
    export default WishlistPage ;