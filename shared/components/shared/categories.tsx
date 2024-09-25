"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";
import Link from "next/link";
import { UseCategoryStore } from "@/shared/store/category";

interface Props {
  className?: string;
  categories: any[];
}
export const Categories: React.FC<Props> = ({ className, categories }) => {
  const categoryActiveId = UseCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map(({ name, id }, index) => (
        <Link
          href={`/#${name}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary "
          )}
          key={index}
        >
          <button>{name}</button>
        </Link>
      ))}
    </div>
  );
};
