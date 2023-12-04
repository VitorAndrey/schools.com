"use client";

import { usePathname } from "next/navigation";

import { LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import Link from "next/link";

import { cn } from "@/lib/utils";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <nav
          className={cn("flex items-center space-x-4 lg:space-x-6", className)}
          {...props}
        >
          <Link
            href="/"
            className={`${
              pathname === "/" && "text-black"
            } text-sm font-medium text-muted-foreground transition-colors hover:text-black`}
          >
            Escolas
          </Link>
          <Link
            href="/cities"
            className={`${
              pathname === "/cities" && "text-black"
            } text-sm font-medium text-muted-foreground transition-colors hover:text-black`}
          >
            Cidades
          </Link>
          <Link
            href="/dashboard"
            className={`${
              pathname === "/dashboard" && "text-black"
            } text-sm font-medium text-muted-foreground transition-colors hover:text-black`}
          >
            Dashboard
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>VA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Vitor Andrey
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    vitor@exemplo.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="justify-between items-center">
                Log out
                <LogOutIcon color="gray" size={16} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
