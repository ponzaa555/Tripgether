"use client";
import MyDialog from "@/src/components/UI/MyDialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/UI/form";
import { FormEventHandler, useEffect, useState } from "react";
import { Button } from "../../UI/Button";
import { useMutationState } from "@/src/hooks/useMutation";
import { api } from "@/convex/_generated/api";
import { BlogDb } from "@/src/models/components/Blog";
import { toast } from "sonner";
import { useRouter } from "next/navigation"
import { id } from "date-fns/locale";
import { nanoid } from "nanoid";

interface TripDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userId:string;
}

const formSchema = z
    .object({
        location: z.string(),
        starDate: z.date(),
        endDate: z.date(),
    })


export const TripDialog = ({
    isOpen,
    setIsOpen,
    userId
}: TripDialogProps) => {
    const { mutate, pending } = useMutationState(api.blog.create);

    const [location, setLocation] = useState("")
    const router = useRouter()


    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Make sure you add "name" to each input.
        const formData = new FormData(e.currentTarget);

        const location = formData.get("location") as string;
        const startDate = formData.get("startDate") as string;
        const endDate = formData.get("endDate") as string;

        const roomId = await nanoid()
        const body: BlogDb = {
            blogName: location ,
            authorId:userId,
            coverImgUrl:"",
            teamMate:[userId],
            stDate:startDate,
            endDate:endDate,
            roomId : roomId
        };
        // console.log(body)
        mutate({
            blogName: location ,
            authorId :userId ,
            teamMate:[userId],
            stDate:startDate,
            endDate:endDate,
            roomId : roomId
        }).then((blogId) => {
            toast.success("Create Plans")
            router.push(`/draft/${roomId}`)
        }).catch((error) => {
            console.log({error})
            toast.error("Faild to create trips")
        })
        setIsOpen(false);
    }


    return (
        <MyDialog title="Create trip" setIsOpen={setIsOpen} isOpen={isOpen} >
            <form
                className="space-y-6  pt-10 max-h-[400px] font-light"
                onSubmit={onSubmit}>
                {/* TODO query google map */}
                <div className=" w-full flex-col space-y-2 text-sm">
                    <p>where to ?</p>
                    <input
                        name="location"
                        type="text"
                        placeholder="Enter destination "
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full py-2 pl-3 rounded-md border-gray-100 border-2 focus:border-gray-400
                 outline-none"/>
                </div>
                <p className=" text-sm">Dates (optional)</p>
                <div className=" flex w-full justify-between items-center space-x-3">
                    <input
                        name="startDate"
                        type="date"
                        placeholder="Enter destination "
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full py-2 pl-3 rounded-md border-gray-100 border-2 focus:border-gray-400
                 outline-none font-light text-sm"/>
                    <p> - </p>
                    <input
                        name="endDate"
                        type="date"
                        placeholder="Enter destination "
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full py-2 pl-3 rounded-md border-gray-100 border-2 focus:border-gray-400
                 outline-none font-light text-sm"/>
                </div>
                <div className=" py-[40px]">
                    <Button className=" w-full ">
                        start planing
                    </Button>
                </div>
            </form>
        </MyDialog>
    )
}