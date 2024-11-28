"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";



export default function Profile() {
    const {data:session } = useSession()
    return(
        <>
         {session ? (
            <div>
                <Image src={session.user?.image as string} width={50} height={50} className=" rounded-full" alt=""/>
                <p>{session.user?.email}</p>
                <p>{session.user?.name}</p>
            </div>
         ) : (
            <div>
                No authentication
            </div>
         )};
        </>
    )
}