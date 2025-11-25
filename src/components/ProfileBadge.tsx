"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { UserRound } from "lucide-react";

type ProfileBadgeProps = {
  user?: {
    name: string;
    avatar?: string;
  } | null;
};

export function ProfileBadge({ user }: ProfileBadgeProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!user) {
      router.push("/auth/sign-in");
    } else {
      router.push("/profile");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="w-9 h-9 flex items-center justify-center rounded-full border transition"
      variant={user ? 'outline' : 'secondary'}
    >
      {user?.avatar ? (
        <Image
          src={user.avatar}
          alt={user.name}
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
      ) : (
        <UserRound />
      )}
    </Button>
  );
}
