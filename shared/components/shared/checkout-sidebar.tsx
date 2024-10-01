import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";

const VAT = 15;
const DELIVERY_PRICE = 250;

type Props = {
  totalAmount: number;
  loading: boolean;
};

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;
  return (
    <div className="w-[450px]">
      <WhiteBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl ">Итого:</span>
          {loading ? (
            <Skeleton className="w-48 h-11" />
          ) : (
            <span className="text-[34px] font-extrabold">{totalPrice}$ </span>
          )}
        </div>

        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Package className="mr-2 text-gray-300" />
              Стоимость товаров:
            </div>
          }
          value={
            loading ? <Skeleton className="w-48 h-11" /> : `${totalAmount} `
          }
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Percent className="mr-2 text-gray-300" />
              Налоги:
            </div>
          }
          value={`${vatPrice} `}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Truck className="mr-2 text-gray-300" />
              Доставка:
            </div>
          }
          value={`${DELIVERY_PRICE} `}
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
  );
};
