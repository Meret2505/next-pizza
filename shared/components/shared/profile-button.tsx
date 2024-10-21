import { CircleUser, User } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui";
import Link from "next/link";

interface Props {
  OnclickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  OnclickSignIn,
  className,
}) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={OnclickSignIn}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
