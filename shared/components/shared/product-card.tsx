import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { ingredients } from "@/prisma/constant";
import { Ingredient, ProductItem } from "@prisma/client";
import { ProductWithRelations } from "@/shared/@types/product";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  product: ProductWithRelations;
  className?: string;
}
export const ProductCard: React.FC<Props> = ({
  className,
  id,
  name,
  price,
  imageUrl,
  product,
  ingredients,
}) => {
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const [addCartItem, fetchCartItems, loading] = useCartStore((state) => [
    state.addCartItem,
    state.fetchCartItems,
    state.loading,
  ]);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemID = productItemId ?? firstItem.id;
      await addCartItem({
        productItemId: itemID,
        ingredients,
      });
      toast.success(product.name + " добавлена в корзину");
      fetchCartItems();
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину");
      console.log(error);
    }
  };

  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img
            src={imageUrl}
            className="w-[215px] h-[215px]"
            alt="product-card"
          />
        </div>
        <Title text={name} className="font-bold mb-1 mt-3" />
        {ingredients.map((ing) => (
          <span className="text-sm text-gray-400" key={ing.id}>
            {ing.name + ", "}
          </span>
        ))}
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price}</b>
          </span>
          <Button
            variant={"secondary"}
            className="text-base font-bold"
            onClick={() => onSubmit()}
          >
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
