"use client";
import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import { useModal } from "@/src/context/ModalContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { closeLoginModal } = useModal();
  const router = useRouter();

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...credentials,
      });

      if (res?.ok) {
        toast.success("Login Success");
        closeLoginModal();
        router.push("/");
      } else {
        toast.error("Login Failed");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      handleLogin({ email, password });
    }
  };

  return (
    <form className=" space-y-5" onSubmit={handleSubmit}>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter email"
        required
      />
      <div className=" relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 dark:text-gray-300 focus:outline-none"
        >
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </button>
      </div>
      <p className=" my-5 text-sm font-sans">
        Forget your
        <a href="/" className=" text-blue-300">
          {" "}
          password?
        </a>
      </p>
      <button
        className=" text-center py-3 w-full  bg-cyan-300 rounded-lg hover:bg-cyan-500"
        type="submit"
      >
        <p className=" text-white font-bold text-base ">Continue</p>
      </button>
    </form>
  );
};

export default LoginForm;
