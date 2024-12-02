"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import Button from '@/components/UI/Button';
import { useModal } from '@/context/ModalContext';
import { signIn } from 'next-auth/react';

const LoginModal = () => {
    const { isLoginModalOpen, closeLoginModal } = useModal();

    if (!isLoginModalOpen) return null; // Do not render if the modal 
    return (
        <div className=' fixed inset-0  bg-black bg-opacity-80  z-[1000]
            flex justify-center items-center w-full'>
            <div className=' w-[40%] bg-white p-10 rounded-lg'>
                {/* insite form */}
                <button className='flex text-gray-400 justify-end w-full pr-3 font-light' onClick={closeLoginModal}>x</button>
                <div className='   w-full text-center content-center p-4'>
                    <h1 className=' text-xl font-bold mb-5'>Login</h1>
                    <button className=' flex text-center w-full justify-center py-3 rounded-lg border border-black text-sm font-sans mt-8'
                    onClick={()  => signIn("google")}>
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSua7o13hCS1lopLSoAf5zJA1f69XVh4p7w0A&s"
                            width={30} height={30} alt=''
                            className=' mr-5' />
                        <p className=' pt-1'>Continue with Google</p>
                    </button>
                    <p className=' my-5 text-sm font-light'>or</p>
                    {/* Form */}
                    <LoginForm />
                    <p className='my-5 text-sm font-sans'>If you don't have an account?
                        <a href="/" className='text-blue-300'>  Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
