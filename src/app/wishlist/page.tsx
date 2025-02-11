import { fetchProducts } from "@/utilities/utils/fetchactions";
import { Product } from "@/utilities/types/types";
import WishlistPage from "@/utilities/components/WishlistPage";
const  ProductTransfer = async()=> {
    const products:Product[]=await fetchProducts();
    return (
     <WishlistPage products={products} />
    )
    }
    export default ProductTransfer;