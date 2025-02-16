import { Product } from "@/utilities/types/product.types";
import ProductWrapper from "@/utilities/components/product/ProductWrapper";
import { fetchAllProducts, searchProducts } from "@/utilities/api/product";

const ProductsList = async ({
  searchParams,
}: {
  searchParams?: { q?: string };
}) => {
  const query = searchParams?.q;
  const products: Product[] = query
    ? await searchProducts(query)
    : await fetchAllProducts();

  return <ProductWrapper products={products} query={query} />;
};

export default ProductsList;
