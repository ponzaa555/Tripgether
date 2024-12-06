import { Fragment } from "react";
import LoginModal from "@/components/user/login/LoginModal";


export default function Login() {
    return (
            <div className=" p-20 text-center">
                <h1 className=" text-3xl">Create Custom Model in React</h1>
                <button className=" text-white bg-blue-700 font-medium 
                text-sm rounded-lg px-5 py-2.5 text-center mr-5">
                    Login Model
                </button>
                <button className=" text-white bg-blue-700 font-medium 
                text-sm rounded-lg px-5 py-2.5 text-center">
                    Register Model
                </button>
                {/* <LoginModal/> */}
            </div>
    )
}