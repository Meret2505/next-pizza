"use client";
import {
  CheckoutCart,
  CheckoutSidebar,
  Container,
  Title,
  CheckoutPersonalForm,
  CheckoutAdresForm,
} from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { CheckoutFormSchema, CheckoutFormValues } from "@/shared/constants";

const CheckoutPage = () => {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    console.log(data);
  };
  const onUpdateQuantity = (
    id: number,
    quantity: number,
    type: "minus" | "plus"
  ) => {
    const newQuantity = type === "minus" ? quantity - 1 : quantity + 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container>
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[28px] mt-4"
      />
      <FormProvider {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Cep tarap */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onUpdateQuantity}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />
              <CheckoutPersonalForm />
              <CheckoutAdresForm />
            </div>

            {/* sag tarap */}
            <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default CheckoutPage;
