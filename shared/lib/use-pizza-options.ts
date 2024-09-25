'use client'
import React, { useState } from "react";
import { Variant } from "../components/shared/product-variants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { Ingredient, ProductItem } from "@prisma/client";
import { getAvailablePizzaSizes } from "./get-available-pizza-sizes";

type ReturnProps = {
    size: PizzaSize;
    type: PizzaType;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    selectedIngredients: Set<number>;
    currentItemId?: number;
    setSelectedIngredients: (key: number) => void
    availableSizes: Variant[]
}

export const usePizzaOptions
    = (items: ProductItem[]): ReturnProps => {

        const [size, setSize] = useState<PizzaSize>(20);
        const [type, setType] = useState<PizzaType>(1);
        const [selectedIngredients, { toggle: setSelectedIngredients }] = useSet(
            new Set<number>([])
        );
        const availableSizes = getAvailablePizzaSizes(items, type);

        const currentItemId = items.find(item => item.pizzaType === type && item.size === size)?.id

        React.useEffect(() => {
            const isAvailableSize = availableSizes?.find(
                (item) => Number(item.value) === size && !item.disabled
            );

            const availabeSize = availableSizes?.find((item) => !item.disabled);
            if (!isAvailableSize && availabeSize) {
                setSize(Number(availabeSize.value) as PizzaSize);
            }
        }, [type]);
        return { size, type, setSize, setType, selectedIngredients, currentItemId, setSelectedIngredients, availableSizes };
    }