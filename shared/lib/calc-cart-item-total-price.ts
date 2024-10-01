import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO) => {
    const ingredientPrices = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
    return (ingredientPrices + item.productItem.price) * item.quantity
}