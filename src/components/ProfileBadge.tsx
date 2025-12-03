"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAvatar } from "@/app/providers/AvatarProvider";

export function ProfileBadge() {
  const { data: session } = useSession();
  const user = session?.user;
  const { avatarUrl } = useAvatar(); // may be undefined

  const router = useRouter();

  const handleClick = () => {
    if (!user) {
      router.push("/auth/sign-in");
    } else {
      router.push("/profile");
    }
  };

  // compute initials safely
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : null;

  // choose image source by priority
  const imageSrc = avatarUrl ?? user?.image ?? null;

  return (
    <Button
      onClick={handleClick}
      className="w-9 h-9 flex items-center justify-center rounded-full border transition overflow-hidden p-0"
      variant={user ? "outline" : "secondary"}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={user?.name ?? "User Profile"}
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
      ) : initials ? (
        <span className="inline-block w-9 h-9 leading-9 text-sm font-semibold text-slate-700">
          {initials}
        </span>
      ) : (
        <UserRound />
      )}
    </Button>
  );
}
