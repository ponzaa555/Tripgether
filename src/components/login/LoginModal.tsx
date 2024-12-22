"use client";
import Image from "next/image";
import React, { useState } from "react";
import LoginForm from "@/src/components/login/LoginForm";
import { useModal } from "@/src/context/ModalContext";
import { signIn } from "next-auth/react";
import { Dialog, DialogContent } from "@/src/components/UI/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/src/components/UI/Button";
import RegisterDialog from "@/src/components/register/RegisterDialog";

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal } = useModal();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
        <DialogContent className="sm:w-[60%] lg:w-[35%]">
          <DialogTitle>
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
                <Button
                  className="text-blue-300"
                  variant="link"
                  onClick={() => {
                    closeLoginModal();
                    setIsRegisterDialogOpen(true);
                  }}
                >
                  {" "}
                  Register
                </Button>
              </p>
            </div>
          </DialogTitle>
        </DialogContent>
      </Dialog>
      <RegisterDialog
        isOpen={isRegisterDialogOpen}
        setIsOpen={setIsRegisterDialogOpen}
      />
    </>
  );
};

export default LoginModal;
