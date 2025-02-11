
import { fetchProducts } from "@/utilities/utils/fetchactions";
import { querySearch } from "@/utilities/utils/searchActions";
import { Product } from "@/utilities/types/types";
import ProductWrapper from "@/utilities/components/ProductWrapper";



const ProductsList = async ({ searchParams }: { searchParams?: { q?: string } }) => {
  const query = searchParams?.q;
  const products:Product[] = query ? await querySearch(query) : await fetchProducts();


  return (
  <ProductWrapper products={products} query={query} />
  );
};

export default ProductsList;
