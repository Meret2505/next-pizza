"use client";
import React from "react";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { CardDrawer } from "./card-drawer";
import { useCartStore } from "@/shared/store";
import { cn } from "@/shared/lib/utils";

type Props = {};

export const CardButton: React.FC<Props> = ({}) => {
  const [totalAmount, items, loading] = useCartStore((state) => [
    state.totalAmount,
    state.items,
    state.loading,
  ]);
  return (
    <CardDrawer>
      <Button
        loading={loading}
        className={cn("group relative", { "w-[105px]": loading })}
      >
        <b>{totalAmount}$</b>
        <span className={"h-full w-[1px] bg-white/30 mx-3"} />
        <div
          className={
            "flex items-center gap-1 transition duration-300 group-hover:opacity-0"
          }
        >
          <ShoppingCart className={"h-4 relative"} strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CardDrawer>
  );
};