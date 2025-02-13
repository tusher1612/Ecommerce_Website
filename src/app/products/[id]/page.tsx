import { SingleProduct } from "@/utilities/ProductActions/ProductFetch";
import { Params, Product } from "@/utilities/types/types";
import SingleProductWrapper from "@/utilities/components/product/SingleProductWraper";

const SingleProductPage = async ({ params }: { params: Params }) => {
  const productId = Number(params.id); // Convert to number
  const myProduct: Product | null = await SingleProduct(productId);

  // Handle case where product is not found
  if (!myProduct) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <SingleProductWrapper myProduct={myProduct} />
  );
};

export default SingleProductPage;
