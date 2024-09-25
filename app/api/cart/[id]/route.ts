import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-aomout";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const data = (await req.json()) as { quantity: number }
        const token = req.cookies.get('cartToken')?.value
        const numID = Number(id)
        if (!token) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 })
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: numID,
            },
        })

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' })
        }


        await prisma.cartItem.update({
            where: {
                id: numID,
            },
            data: {
                quantity: data.quantity,
            }
        })
        const updatedUserCart = await updateCartTotalAmount(token)
        return NextResponse.json(updatedUserCart)
    } catch (error) {
        console.log('[CART_PATCH] Server error', error);
        return NextResponse.json({ message: 'Error while updating cart' }, { status: 500 })
    }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const token = req.cookies.get('cartToken')?.value;
        if (!token) {
            return NextResponse.json({ message: 'Not authorized' }, { status: 401 })
        }
        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id,
            },
        })
        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' })
        }
        await prisma.cartItem.delete({
            where: {
                id,
            },
        })
        const updatedUserCart = await updateCartTotalAmount(token)
        return NextResponse.json(updatedUserCart)

    } catch (error) {
        console.log('[CART_PATCH] Server error', error);
        return NextResponse.json({ message: 'Error while deleting cart item', error }, { status: 500 })
    }
}