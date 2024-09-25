"use client";
import React, { PropsWithChildren } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CardDrawerItem } from "./card-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { useCartStore } from "@/shared/store";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import Image from "next/image";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";

type Props = {
  className?: string;
};

export const CardDrawer: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  const [
    fetchCartItems,
    totalAmount,
    items,
    loading,
    updateQuantity,
    removeCartItem,
  ] = useCartStore((state) => [
    state.fetchCartItems,
    state.totalAmount,
    state.items,
    state.loading,
    state.updateItemQuantity,
    state.removeCartItem,
  ]);
  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onUpdateQuantity = async (
    id: number,
    quantity: number,
    type: "minus" | "plus"
  ) => {
    const newQuantity = type === "minus" ? quantity - 1 : quantity + 1;
    await updateQuantity(id, newQuantity);
    fetchCartItems();
  };
  const onRemoveCartItem = async (id: number) => {
    await removeCartItem(id);
    fetchCartItems();
  };
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <div
          className={cn(
            "flex flex-col h-full",
            !totalAmount && "justify-center"
          )}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине{" "}
                <span className="font-bold">{items.length} товара</span>
              </SheetTitle>
              <SheetClose />
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col justify-center items-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-box.png"
                alt="empty box"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Корзина пуста"
                className="text-center font-bold my-2"
              />
              <p className="text-cener text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>
              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}
          {totalAmount > 0 && (
            <>
              <div className="-m-x-6 mt-5 scrollbar flex-1 overflow-auto">
                {items?.map((item) => (
                  <div className="mb-2">
                    <CardDrawerItem
                      key={item.id}
                      details={
                        item.pizzaSize && item.pizzaType
                          ? getCartItemDetails(
                              item.pizzaType as PizzaType,
                              item.pizzaSize as PizzaSize,
                              item.ingredients
                            )
                          : ""
                      }
                      id={item.id}
                      disabled={item.disabled}
                      name={item.name}
                      imageUrl={item.imageUrl}
                      price={item.price}
                      quantity={item.quantity}
                      onUpdateQuantity={(type) =>
                        onUpdateQuantity(item.id, item.quantity, type)
                      }
                      onRemoveCartItem={() => onRemoveCartItem(item.id)}
                    />
                  </div>
                ))}
              </div>
              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} ₽</span>
                  </div>

                  <Link href="/cart">
                    <Button
                      // onClick={() => setRedirecting(true)}
                      // loading={redirecting}
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
