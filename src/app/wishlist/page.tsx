import { fetchProducts } from "@/utilities/Product/ProductFetch";
import { Product } from "@/utilities/types/types";
import WishlistComponent from "@/utilities/components/wishlist/WishlistComponent";

const  WishlistPage = async()=> {
    const products:Product[]=await fetchProducts();
    return (
     <WishlistComponent products={products} />
    )
    }
    export default WishlistPage ;