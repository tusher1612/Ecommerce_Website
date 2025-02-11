import { SingleProduct } from "@/utilities/utils/datafetch/datafetch";
import { Params, Product } from "@/utilities/types/types";
import SinglePorductWrapper from "@/utilities/components/product/SingleProductWraper";

const SingleProductPage = async ({ params }: { params: Params }) => {
  const productId = Number(params.id); // Convert to number
  const myProduct: Product | null = await SingleProduct(productId);

  // Handle case where product is not found
  if (!myProduct) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <SinglePorductWrapper myProduct={myProduct} />
  );
};

export default SingleProductPage;
