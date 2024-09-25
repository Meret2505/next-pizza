"use client";
import React from "react";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { UseCategoryStore } from "@/shared/store/category";
interface Props {
  className?: string;
  title: string;
  products: any[];
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
  className,
  categoryId,
  products,
  title,
  listClassName,
}) => {
  const setActiveCategoryId = UseCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });
  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size={"lg"} className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            name={product.name}
            ingredients={product.ingredients}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};
