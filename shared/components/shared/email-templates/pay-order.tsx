import React from "react";

interface EmailTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
  className?: string;
}

export const PayOrderTemplate: React.FC<EmailTemplateProps> = ({
  orderId,
  totalAmount,
  paymentUrl,
  className,
}) => {
  return (
    <div className={className}>
      <h1>Заказ #{orderId}</h1>
      <p>
        Оплатите заказ на сумму <b>{totalAmount}$</b>. Перейдите
        <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа
      </p>
    </div>
  );
};
