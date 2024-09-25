"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";

interface Props {
  title: string;
  items: FilterChecboxProps[];
  defaultItems?: FilterChecboxProps[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickedChecbox?: (id: string) => void;
  defaultValue?: string[];
  className?: string;
  selectedValues: Set<string>;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  items,
  title,
  className,
  defaultItems,
  defaultValue,
  limit = 5,
  onClickedChecbox,
  loading,
  searchInputPlaceholder = "Поиск ...",
  selectedValues,
  name,
}) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [showAll, setShowAll] = React.useState(false);
  const list =
    showAll && searchValue == ""
      ? items
      : showAll && searchValue != ""
      ? items.filter((item) =>
          item.text.toLowerCase().includes(searchValue.toLowerCase())
        )
      : (defaultItems || items).slice(0, limit);
  const onChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };
  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton className="mb-3 h-6 rounded-[8px]" key={index} />
          ))}
        <Skeleton className="mb-3 h-6 rounded-[8px] w-28" />
      </div>
    );
  }
  return (
    <div className={cn("", className)}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={(e) => onChangeSearchValue(e.target.value)}
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selectedValues?.has(item.value)}
            onCheckedChange={() => onClickedChecbox?.(item.value)}
            name={name}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
