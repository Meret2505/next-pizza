"use client";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import React from "react";
import { Container } from "./container";
import { AuthModal, CardButton, ProfileButton, SearchInput } from "./";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface Props {
  hasSearch?: boolean;
  hasCard?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch,
  hasCard = true,
  className,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  React.useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена!";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn(" border-b", className)}>
      <Container className={"flex items-center justify-between py-8"}>
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src={"/logo.png"} alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black ">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1 ">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton OnclickSignIn={() => setOpenAuthModal(true)} />
          {hasCard && <CardButton />}
        </div>
      </Container>
    </header>
  );
};
