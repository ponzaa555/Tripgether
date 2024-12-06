"use client"
import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useModal } from "@/context/ModalContext";
import {ErrorToast, LoadingToast, SuccessToast} from "@/components/toastcomponent/toast";
import { toastErrorOptions, toastLoadingOptions, toastSuccessOptions } from "@/components/toastcomponent/toastOpteions";



const LoginForm: React.FC= () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { isLoginModalOpen, closeLoginModal } = useModal();

    const handleLogin = async (credentials: { email: string; password: string }) => {
        setIsSubmitting(true);
        setErrorMessage(null);

        const toastId = LoadingToast({message: "Loading....", options: toastLoadingOptions});
        
        try {
            const result = await signIn("credentials", {
                redirect: false,
                ...credentials,
            });
            
            toast.dismiss(toastId as string);
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (result?.error) {
                ErrorToast({message: result.error, options: toastErrorOptions});
            } else {
                SuccessToast("Login Success", toastSuccessOptions);
                closeLoginModal();
            }
        } finally {
            setIsSubmitting(false);
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
                    <FontAwesomeIcon icon={showPassword ? faEye  : faEyeSlash} />
                </button>
            </div>
            <p className=' my-5 text-sm font-sans'>Forget your
                <a href="/" className=' text-blue-300'> password?</a>
            </p>
            <button className=" text-center py-3 w-full  bg-cyan-300 rounded-lg hover:bg-cyan-500" type="submit">
                <p className=" text-white font-bold text-base ">Continue</p>
            </button>
        </form>
    )
};

export default LoginForm;
