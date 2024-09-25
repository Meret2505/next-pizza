import {
  CheckoutItemDetails,
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import React from "react";

type Props = {};

const CheckoutPage = (props: Props) => {
  return (
    <Container>
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[28px] mt-4"
      />
      <div className="flex gap-10">
        {/* Cep tarap */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1.Корзина">213123</WhiteBlock>
          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Фамилия"
              />
              <Input name="email" className="text-base" placeholder="E-mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input
                name="address"
                className="text-base"
                placeholder="Введите адрес"
              />
              <Textarea
                rows={5}
                className="text-base"
                placeholder="Комментарии к заказу"
              />
            </div>
          </WhiteBlock>
        </div>
        {/* sag tarap */}
        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl ">Итого:</span>
              <span className="text-[34px] font-extrabold">450 $</span>
            </div>

            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package className="mr-2 text-gray-300" />
                  Стоимость товаров:
                </div>
              }
              value="3000 $"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Percent className="mr-2 text-gray-300" />
                  Налоги:
                </div>
              }
              value="3000 $"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck className="mr-2 text-gray-300" />
                  Доставка:
                </div>
              }
              value="3000 $"
            />

            <Button
              // loading={loading}
              type="submit"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Перейти к оплате
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
