"use client"
import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";



const LoginForm: React.FC= () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const handleLogin = async (credentials: { email: string; password: string }) => {
        setIsSubmitting(true); // Start loading
        setErrorMessage(null); // Clear previous errors

        console.log("handle login loginForm")
        const result = await signIn("credentials", {
            redirect: false, // Prevent automatic redirection
            ...credentials,
        });
        const toastOptions = {
            position: "top-right" as const,
            duration: 3000,
            style: {
                background: '#fff',
                color: '#1F2937',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
            className: 'group',
            // Add custom close button
            closeButton: (t: any) => (
                <button
                    className="absolute right-2 top-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    onClick={() => toast.dismiss(t.id)}
                >
                    <span className="text-gray-500 text-sm">×</span>
                </button>
            ),
        };

        if (result?.error) {
            toast.error(result.error, {
                ...toastOptions,
                style: {
                    ...toastOptions.style,
                    background: '#B91C1C', // Red background
                    color: '#ffffff', // White text
                },
                className: 'border-2 border-white', // White border
                icon: '❌',
            });
        } else {
            toast.success("Login successful!", {
                ...toastOptions,
                className: 'border border-green-200',
                icon: '✅',
            });
        }

        setIsSubmitting(false); // Stop loading
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
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 dark:text-gray-300 focus:outline-none"
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
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
