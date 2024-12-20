"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { link } from "@/lib/frontend/data";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ChevronDown } from "lucide-react";
import SignInButton from "../login/SiginButton";

export default function MynavBar() {
  const activePath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="fixed w-full h-14 shadow-xl bg-white z-[50]">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={105}
            height={60}
            className="cursor-pointer w-full h-full"
          />
        </Link>
        <div className="hidden sm:flex ml-auto">
          <ul className="hidden sm:flex">
            {link.map((data) => {
              if (
                data.name === "Chat" &&
                (!session?.user || status !== "authenticated")
              ) {
                return null;
              } else {
                return (
                  <Link key={`${data.name}-${data.name}`} href={data.href}>
                    <li
                      className={`ml-10 uppercase hover:border-b-2 hover:border-amber-800 text-base font-base active:hover:border-amber-800 active:hover:text-orange-500 active:hover:font-bold ${
                        activePath.startsWith(data.href)
                          ? "border-amber-800 text-orange-500 font-bold"
                          : ""
                      }`}
                    >
                      {data.name}
                    </li>
                  </Link>
                );
              }
            })}
          </ul>
        </div>
        <>
          <div className="flex justify-center ml-auto select-none">
            {!session?.user || status !== "authenticated" ? (
              <div className="px-7">
                <SignInButton />
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-row items-center gap-1">
                  <Avatar>
                    <AvatarImage
                      src={
                        session.user.image ??
                        "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                      }
                    />
                  </Avatar>
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div onClick={handleNav} className="sm:hidden cursor-pointer pl-2">
            <AiOutlineMenu size={25} />
          </div>
        </>
      </div>
      <div
        className={
          isMenuOpen
            ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
            : "fixed left-[-100%] top-0 h-screen p-10 ease-in duration-500"
        }
      >
        <div className="flex w-full items-center justify-end">
          <div onClick={handleNav} className="cursor-pointer">
            <AiOutlineClose size={25} />
          </div>
        </div>
        <div className="flex-col py-4">
          <ul>
            {link.map((data) => {
              if (
                data.name === "Chat" &&
                (!session?.user || status !== "authenticated")
              ) {
                return null;
              } else {
                return (
                  <Link key={`${data.name}-${data.name}`} href={data.href}>
                    <li
                      className={`py-4 uppercase hover:border-b-2 hover:border-amber-800 text-base font-base active:hover:border-amber-800 active:hover:text-orange-500 active:hover:font-bold ${
                        activePath.startsWith(data.href)
                          ? "border-amber-800 text-orange-500 font-bold"
                          : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {data.name}
                    </li>
                  </Link>
                );
              }
            })}
          </ul>
        </div>
        <div className="flex flex-row justify-around pt-10 items-center">
          <AiOutlineInstagram size={30} className="cursor-pointer" />
          <AiOutlineFacebook size={30} className="cursor-pointer" />
          <AiOutlineTwitter size={30} className="cursor-pointer" />
        </div>
        <Link href="/" className="flex justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={500}
            height={500}
            className="cursor-pointer pt-10 w-auto h-auto"
          />
        </Link>
      </div>
    </nav>
  );
}
