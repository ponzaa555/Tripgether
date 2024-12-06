"use client";
import Image from "next/image";
import React from "react";
import LoginForm from "./LoginForm";
import { useModal } from "@/context/ModalContext";
import { signIn } from "next-auth/react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal } = useModal();

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="sm:w-[60%] lg:w-[35%]">
        <DialogTitle>
          {/* <button className='flex text-gray-400 justify-end w-full pr-3 font-light' 
                    onClick={closeLoginModal}>x</button> */}
          <div className="w-full text-center content-center p-4">
            <h1 className="text-xl font-bold mb-5">Login</h1>
            <button
              className="flex text-center w-full justify-center py-3 rounded-lg border border-black text-sm font-sans mt-8"
              onClick={() => signIn("google")}
            >
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSua7o13hCS1lopLSoAf5zJA1f69XVh4p7w0A&s"
                width={30}
                height={30}
                alt=""
                className="mr-5"
              />
              <p className="pt-1">Continue with Google</p>
            </button>
            <p className="my-5 text-sm font-light">or</p>
            <LoginForm />
            <p className="my-5 text-sm font-sans">
              If you don't have an account?
              <a href="/" className="text-blue-300">
                {" "}
                Register
              </a>
            </p>
          </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
