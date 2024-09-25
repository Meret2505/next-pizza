"use client";
import { cn } from "@/shared/lib/utils";
import React, { Suspense } from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { useFilters, useIngredients, useQueryFilters } from "@/shared/hooks";
import { CheckboxFiltersGroup } from "./";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RefreshCcw } from "lucide-react";
interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);
  const searchParams = useSearchParams();
  const hasQuery = searchParams.toString().length > 0; // Check if query params exist
  const router = useRouter();

  const defaultItems = ingredients.map((item) => ({
    value: item.id.toString(),
    text: item.name,
  }));

  return (
    <div className={cn("", className)}>
      <div className={cn("flex  items-center gap-3")}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
        {hasQuery ? (
          <RefreshCcw
            className="mb-5 text-primary cursor-pointer"
            size={20}
            onClick={() => router.push("/")!}
          />
        ) : null}
      </div>

      {/* Pizza Type Checkboxes */}
      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickedChecbox={filters.setPizzaTypes}
        selectedValues={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      {/* Size Checkboxes */}
      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickedChecbox={filters.setSizes}
        selectedValues={filters.sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      {/* Price Filter */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.updatePrice("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.updatePrice("priceTo", Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={([priceFrom, priceTo]) =>
            filters.setPrices({ priceFrom, priceTo })
          }
        />
      </div>

      {/* Ingredients Filter */}
      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        name="ingredients"
        limit={6}
        defaultItems={defaultItems.slice(0, 6)}
        items={defaultItems}
        loading={loading}
        onClickedChecbox={filters.setSelectedIngredients}
        selectedValues={filters.selectedIngredients}
      />
    </div>
  );
};

export default function FiltersWrapper(props: Props) {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <Filters {...props} />
    </Suspense>
  );
}
