"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { HomeIcon, SearchIcon, UserIcon, SettingsIcon } from "lucide-react"

function BottomNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "fixed bottom-0 inset-x-0 bg-background border-t border-border shadow-md flex justify-around items-center h-16",
        className
      )}
      {...props}
    >
      <Button variant="ghost" size="icon" className="flex flex-col items-center">
        <HomeIcon className="h-5 w-5" />
        <span className="text-xs">Home</span>
      </Button>
      <Button variant="ghost" size="icon" className="flex flex-col items-center">
        <SearchIcon className="h-5 w-5" />
        <span className="text-xs">Search</span>
      </Button>
      <Button variant="ghost" size="icon" className="flex flex-col items-center">
        <UserIcon className="h-5 w-5" />
        <span className="text-xs">Profile</span>
      </Button>
      <Button variant="ghost" size="icon" className="flex flex-col items-center">
        <SettingsIcon className="h-5 w-5" />
        <span className="text-xs">Settings</span>
      </Button>
    </div>
  )
}

export { BottomNav }
