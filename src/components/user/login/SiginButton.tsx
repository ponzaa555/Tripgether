"use client";

import React from "react";
import { useModal } from "@/context/ModalContext";

const SignInButton: React.FC = () => {
  const { openLoginModal } = useModal();

  return (
    <button
      onClick={openLoginModal}
      className="rounded-lg py-2 px-4 bg-[rgb(29,190,200)] shadow-sm hover:bg-btn-primary-hover 
      text-white duration-300 shrink-0 text-sm whitespace-nowrap"
    >
      Login
    </button>
  );
};

export default SignInButton;
