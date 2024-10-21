import { prisma } from "@/prisma/prisma-client";
import { ProfileForm } from "@/shared/components/shared";
import { getUserSession } from "@/shared/lib";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
}

export default async function ProfilePage({ className }: Props) {
  const session = await getUserSession();
  if (!session) {
    return redirect("/not-auth");
  }
  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  });

  if (!user) {
    return redirect("/not-auth");
  }

  return <ProfileForm data={user} />;
}
