import { cn } from "@/shared/lib/utils";
import React from "react";
import { Categories, Container, SortPopup } from "@/shared/components/shared";

interface Props {
  className?: string;
  categories: any[];
}
export const TopBar: React.FC<Props> = ({ className, categories }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex justify-between items-center">
        <Categories categories={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
