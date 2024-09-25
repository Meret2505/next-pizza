import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import React from "react";
import { Container } from "./container";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { CardButton, SearchInput } from "./";
import Link from "next/link";

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
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>
          {hasCard && <CardButton />}
        </div>
      </Container>
    </header>
  );
};
