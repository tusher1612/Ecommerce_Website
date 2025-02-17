import { Product } from "@/utilities/types/product.types";
import ProductWrapper from "@/utilities/components/product/ProductWrapper";
import { fetchAllProducts } from "@/utilities/api/product";

const AllProductPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Determine the limit, defaulting to 10 if not provided
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 12;

  // Determine the query, if provided
  const query =
    typeof searchParams.query === "string" &&
    searchParams.query.trim().length > 0
      ? searchParams.query
      : undefined;

  console.log("Limit:", limit);

  // Fetch products based on the current page and limit
  const products: Product[] = await fetchAllProducts(limit, query);

  return <ProductWrapper initialProducts={products} />;
};

export default AllProductPage;
