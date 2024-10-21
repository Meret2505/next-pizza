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
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

const CheckoutPage = () => {
  const [submitting, setSubmitting] = React.useState(false);
  const { data: session } = useSession();
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

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");
    }
    if (session) {
      fetchUserInfo();
    }
  }, [session]);
  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error("Заказ успешно оформлен! 📝 Переход на оплату... ", {
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error("Не удалось создать заказ", {
        icon: "❌",
      });
    } finally {
      setSubmitting(false);
    }
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
              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
              <CheckoutAdresForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>

            {/* sag tarap */}
            <CheckoutSidebar
              totalAmount={totalAmount}
              loading={loading || submitting}
            />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default CheckoutPage;
