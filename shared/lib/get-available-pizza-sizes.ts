import { pizzaSizes } from './../constants/pizza';
import { ProductItem } from "@prisma/client";
import { PizzaType } from "../constants/pizza";
import { Variant } from '../components/shared/product-variants';



export const getAvailablePizzaSizes = (items: ProductItem[], type: PizzaType,): Variant[] => {

    const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some(
            (pizza) => Number(pizza.size) === Number(item.value)
        ),
    }));;
}