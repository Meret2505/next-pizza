import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import React from "react";

interface EmailTemplateProps {
  orderId: number;
  items: CartItemDTO[];
  className?: string;
}

export const OrderSuccessTemplate: React.FC<EmailTemplateProps> = ({
  orderId,
  items,
  className,
}) => {
  return (
    <div className={className}>
      <h1>Спасибо за покупку! 🎉</h1>

      <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

      <hr />

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.productItem.product.name} | {item.productItem.price} ₽ x{" "}
            {item.quantity} шт. = {item.productItem.price * item.quantity} ₽
          </li>
        ))}
      </ul>
    </div>
  );
};
