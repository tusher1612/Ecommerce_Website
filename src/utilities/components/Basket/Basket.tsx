// Basket component to display and manage cart items, supporting both user and session-based carts.
import { getTotal, groupById } from "@/utilities/utils/busketActions";
import { useCartStore } from "@/utilities/zustandstore/store";
import AddToCart from "../cart/AddToCart";
import Image from "next/image";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Product } from "@/utilities/types/types";

const Basket = () => {
  const cart = useCartStore((state) => state.cart);
  const sessionCart = useCartStore((state) => state.sessionCart);
  const { data: session } = useSession();
  const router = useRouter();

  const total = getTotal(cart);
  const grouped = groupById(cart);
  const totalSession = getTotal(sessionCart);
  const groupedSession = groupById(sessionCart);

  const handleCheckout = () => {
    if (!session) {
      router.push("/sign-in");
    } else {
      router.push("/payment");
    }
  };

  const renderCartItems = (groupedItems: Record<string, Product[]>, totalAmount: number) => (
    <div className="max-w-2xl mx-auto p-5">
      <ul className="space-y-5 divide-y-2">
        {Object.keys(groupedItems).map((id) => {
          const numericId = parseInt(id);
          const item = groupedItems[numericId][0];
          const groupTotal = getTotal(groupedItems[numericId]);

          return (
            <li key={numericId} className="p-2 my-2 flex items-center justify-center">
              <Image src={item.image} alt={item.title} height={100} width={100} />
              <div className="flex space-x-4 pl-4">
                <div>
                  <p className="line-clamp-2 font-bold">{item.title}</p>
                  <div className="line-clamp-1 text-sm mt-2 font-light" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                </div>
                <div>
                  <p><AddToCart product={item} /></p>
                  <p className="font-bold text-lg my-4">USD {groupTotal}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex mb-3">
        <p className="font-bold text-walmart-default mt-4 ml-auto text-xl">Total: USD {totalAmount}</p>
      </div>
      <Button className="bg-walmart-default rounded-full px-6 py-4 md:px-8 md:py-6 w-full text-center hover:bg-blue-400" onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );

  return session ? renderCartItems(groupedSession, totalSession) : renderCartItems(grouped, total);
};

export default Basket;
