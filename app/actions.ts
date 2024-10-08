'use server'

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared";
import { CheckoutFormValues } from "@/shared/constants";
import { createPayment, sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { Resend } from 'resend'

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies()

        const token = cookieStore.get('cartToken')?.value

        if (!token) {
            throw new Error('No cart token found')
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                token
            },
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        })

        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty')
        }
        if (!userCart) {
            throw new Error('Cart not found')
        }
        /* Создаем заказ */

        const order = await prisma.order.create({
            data: {
                token,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });

        /* Очищаем корзину */
        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            }
        })

        await prisma.cartItem.deleteMany({
            where: { cartId: userCart.id },
        })


        const paymentData = await createPayment({ amount: order.totalAmount, description: 'Оплатите заказ #' + order.id, orderId: order.id })

        if (!paymentData) {
            throw new Error('Payment data not available')
        }

        const paymentUrl = paymentData.confirmation.confirmation_url
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id
            }
        })
        await sendEmail(data.email, 'Next Pizza / Оплатите заказ #' + order.id, PayOrderTemplate({ orderId: order.id, totalAmount: order.totalAmount, paymentUrl }))

        return paymentUrl
    } catch (error) {
        console.log('[create-order] Error', error);
    }
}