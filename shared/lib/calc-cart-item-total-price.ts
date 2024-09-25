import { CartItemDto } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDto) => {
    const ingredientPrices = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
    return (ingredientPrices + item.productItem.price) * item.quantity
}