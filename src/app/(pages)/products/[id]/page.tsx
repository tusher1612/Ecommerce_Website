import SingleProductWrapper from "@/utilities/components/product/SingleProductWraper";
import { fetchProductById } from "@/utilities/api/product";
import { Product } from "@/utilities/types/product.types";
import { Params } from "@/utilities/types/types";

const SingleProductPage = async ({ params }: { params: Params }) => {
  const productId = Number(params.id); // Convert to number
  const myProduct: Product | null = await fetchProductById(productId);

  // Handle case where product is not found
  if (!myProduct) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return <SingleProductWrapper myProduct={myProduct} />;
};

export default SingleProductPage;
