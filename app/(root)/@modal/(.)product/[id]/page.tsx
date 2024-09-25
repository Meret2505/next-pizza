import { prisma } from "@/prisma/prisma-client";
import { ChooseProductModal } from "@/shared/components/shared";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: { items: true, ingredients: true },
  });
  if (!product) {
    return notFound();
  }
  return <ChooseProductModal product={product} />;
}
