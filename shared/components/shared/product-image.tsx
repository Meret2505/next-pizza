import { cn } from "@/shared/lib/utils";
import React from "react";

type Props = {
  className?: string;
  imageUrl: string;
  size?: 20 | 30 | 40;
};
export const PizzaImage: React.FC<Props> = ({ className, imageUrl, size }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative w-full ",
        className
      )}
    >
      <img
        src={imageUrl}
        alt="product-image"
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          {
            "w-[300px] h-[300px]": size === 20,
            "w-[400px] h-[400px]": size === 30,
            "w-[500px] h-[500px]": size === 40,
          }
        )}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 border-gray-200 w-[450px] h-[450px] rounded-full"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-gray-100 w-[370px] h-[370px] rounded-full"></div>
    </div>
  );
};
