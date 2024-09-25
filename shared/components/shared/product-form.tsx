"use client";
import { ProductWithRelations } from "@/shared/@types/product";
import { useCartStore } from "@/shared/store";
import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

type Props = {
  product: ProductWithRelations;
  className?: string;
};
export const ProductForm: React.FC<Props> = ({ product, className }) => {
  const [addCartItem, fetchCartItems, loading] = useCartStore((state) => [
    state.addCartItem,
    state.fetchCartItems,
    state.loading,
  ]);
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
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
  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onCLickedAdd={onSubmit}
        loading={loading}
      />
    );
  }
  return (
    <ChooseProductForm
      onCLickedAdd={onSubmit}
      imageUrl={product.imageUrl}
      price={firstItem.price}
      name={product.name}
      loading={loading}
    />
  );
};
