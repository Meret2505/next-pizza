import { useSearchParams } from "next/navigation";

import { useSet } from "react-use";
import React, { Dispatch, SetStateAction } from "react";

interface PriceRange {
    priceFrom?: number;
    priceTo?: number;
}
interface QueryFilters extends PriceRange {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceRange
}
interface ReturnProps extends Filters {
    setPrices: Dispatch<SetStateAction<PriceRange>>
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
    updatePrice: (name: keyof PriceRange, value: number) => void
}
export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<
        keyof QueryFilters,
        string
    >;

    //  Filter of ingredients
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get("ingredients")?.split(",")));

    //  Filter of sizes
    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(
            searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
        )
    );

    //  Filter of pizzaTypes
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>(
            searchParams.has("pizzaTypes")
                ? searchParams.get("pizzaTypes")?.split(",")
                : []
        )
    );

    //  Filter of prices
    const [prices, setPrices] = React.useState<PriceRange>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const updatePrice = (name: keyof PriceRange, value: number) => {
        setPrices({
            ...prices,
            [name]: value,
        });
    };

    return React.useMemo(() => ({
        sizes,
        pizzaTypes,
        selectedIngredients,
        prices,
        setPrices,
        setPizzaTypes: togglePizzaTypes,
        setSizes: toggleSizes,
        setSelectedIngredients: toggleIngredients,
        updatePrice,
    }), [sizes,
        pizzaTypes,
        selectedIngredients,
        prices,],)
}
