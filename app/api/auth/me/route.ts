import { prisma } from "@/prisma/prisma-client";
import { authOptions } from "@/shared/constants/authOptions";
import { getUserSession } from "@/shared/lib";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'
export async function GET(req: any, res: any) {
    try {
        const user = await getServerSession(req, res, authOptions)
        if (!user) {
            return NextResponse.json({ message: "User not authorized" }, { status: 401 })
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.user.id),
            },
            select: {
                fullName: true,
                email: true,
                password: false
            }
        });
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ messsage: '[VERIY_GET] Server error: ' }, { status: 500 });


    }
}