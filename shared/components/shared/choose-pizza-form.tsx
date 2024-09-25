import React from "react";
import { Title } from "./title";
import { Ingredient, ProductItem } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { IngredientItem, PizzaImage, ProductVariants } from "./";
import { Button } from "../ui";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { usePizzaOptions, getPizzaDetails } from "@/shared/lib/";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onCLickedAdd: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  ingredients,
  name,
  items,
  loading,
  onCLickedAdd,
}) => {
  const {
    availableSizes,
    selectedIngredients,
    setSelectedIngredients,
    setSize,
    setType,
    size,
    type,
    currentItemId,
  } = usePizzaOptions(items);
  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );
  const handleClickAdd = () => {
    if (currentItemId) {
      onCLickedAdd(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn("flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className={cn("w-[490px] bg-[#f7f6f5] p-7")}>
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-5">
          <ProductVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <ProductVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[380px] overflow-auto scrollbar mt-2">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                onClick={() => setSelectedIngredients(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}
        >
          Добавить в корзину за {totalPrice} P
        </Button>
      </div>
    </div>
  );
};
