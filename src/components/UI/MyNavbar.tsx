"use client";

import Image from "next/image";
import Link from "next/link";
import { navToTrip } from "@/lib/frontend/data";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";
import { useState } from "react";
import { Avatar, Dropdown } from "flowbite-react";

export default function MynavBar({}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="fixed w-full h-14 shadow-xl bg-white z-[999]">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={105}
            height={60}
            className="cursor-pointer"
          />
        </Link>
        <div className="hidden sm:flex ml-auto">
          <ul className="hidden sm:flex">
            <Link href={navToTrip.hash}>
              <li className="ml-10 uppercase hover:border-b-2 hover:border-amber-800 text-base font-base active:hover:border-amber-800 active:hover:text-orange-500 active:hover:font-bold">
                Trip
              </li>
            </Link>
            <Link href="#">
              <li className="ml-10 uppercase hover:border-b-2 hover:border-amber-800 hover:text-orange-500 hover:font-bold text-base font-base">
                Chat
              </li>
            </Link>
            <Link href="#">
              <li className="ml-10 uppercase hover:border-b-2 hover:border-amber-800 hover:text-orange-500 hover:font-bold text-base font-base">
                Trip-Plan
              </li>
            </Link>
            <Link href="#">
              <li className="ml-10 uppercase hover:border-b-2 hover:border-amber-800 hover:text-orange-500 hover:font-bold text-base font-base">
                Contact
              </li>
            </Link>
          </ul>
        </div>
        <div className="ml-auto">
          <Dropdown
            arrowIcon={true}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Friends</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
        <div onClick={handleNav} className="sm:hidden cursor-pointer pl-2">
          <AiOutlineMenu size={25} />
        </div>
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
            <Link href="/">
              <li
                onClick={() => setIsMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Home
              </li>
            </Link>
            <Link href="/">
              <li
                onClick={() => setIsMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Trip
              </li>
            </Link>
            <Link href="/">
              <li
                onClick={() => setIsMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Chat
              </li>
            </Link>
            <Link href="/">
              <li
                onClick={() => setIsMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Trip-plan
              </li>
            </Link>
            <Link href="/">
              <li
                onClick={() => setIsMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Contact
              </li>
            </Link>
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
