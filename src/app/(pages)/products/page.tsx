import { Product } from "@/utilities/types/product.types";
import ProductWrapper from "@/utilities/components/product/ProductWrapper";
import { fetchAllProducts, searchProducts } from "@/utilities/api/product";

const ProductsList = async ({
  searchParams,
 // Default to page 1 if not provided
}: {
  searchParams?: { q?: string };
  page?: number;  // Current page
}) => {
  const query = searchParams?.q;

  // Define the limit of products per page
  const limit = 12;

  // Fetch products based on the current page and limit
  const products: Product[] = query
    ? await searchProducts(query, limit)
    : await fetchAllProducts(limit);

  return (
    <ProductWrapper
      initialProducts={products}
      query={query}
  
    />
  );
};

export default ProductsList;
