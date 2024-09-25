import React from "react";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui";

interface Props {
  imageUrl: string;
  name: string;
  onCLickedAdd: VoidFunction;
  loading: boolean;
  price: number;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  onCLickedAdd,
  price,
  loading,
  className,
}) => {
  return (
    <div className={cn("flex flex-1")}>
      <div
        className={cn(
          "flex items-center justify-center flex-1 relative w-full",
          className
        )}
      >
        <img
          src={imageUrl}
          alt="product-image"
          className={cn(
            "relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
          )}
        />
      </div>
      <div className={cn("w-[490px] bg-[#f7f6f5] p-7")}>
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={onCLickedAdd}
        >
          Добавить в корзину за {price} P
        </Button>
      </div>
    </div>
  );
};
