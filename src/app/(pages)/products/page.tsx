import { Product } from "@/utilities/types/product.types";
import ProductWrapper from "@/utilities/components/product/ProductWrapper";
import { fetchAllProducts, searchProducts } from "@/utilities/api/product";

const ProductsList = async ({
  searchParams,
}: {
  searchParams?: { q?: string; page?: string; limit?: string };
}) => {
  const query = searchParams?.q;
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 12;

  const products: Product[] = query
    ? await searchProducts(query, page, limit)
    : await fetchAllProducts(page, limit);

  return <ProductWrapper products={products} query={query} />;
};

export default ProductsList;
