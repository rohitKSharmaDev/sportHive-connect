"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

type ProfileBadgeProps = {
  user?: {
    name: string;
    avatar?: string; // optional custom avatar URL
  } | null;
};

export function ProfileBadge({ user }: ProfileBadgeProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!user) {
      router.push("/login"); // Redirect to your login page
    } else {
      router.push("/profile"); // User profile page
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
        <span className="text-lg fill-white">👤</span>
      )}
    </Button>
  );
}
