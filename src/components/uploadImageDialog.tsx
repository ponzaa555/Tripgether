"use client"

import { RegisterDialogProps } from "../models/components/registerDialog"
import MyDialog from "@/src/components/UI/MyDialog";
import UploadImg from "./uploadImage";
import { UploadCloundinary } from "../lib/backend/uploadCloundinary";
import { useState } from "react";
import LoadingComponent from "./UI/Loading";


interface UploadImgDialog {

}

export const UploadImgDialog = ({
    isOpen,
    setIsOpen,
    blogId,
}: RegisterDialogProps) => {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (file: File, blogId: string) => {
        setLoading(true);
        await UploadCloundinary(file, blogId)
        setIsOpen(false)
        setLoading(false)
    }
    return (
        // TODO แก้ UI loading 
        <>
            {!loading ? (
                <MyDialog title="" isOpen={isOpen} setIsOpen={setIsOpen} >
                    <UploadImg blogId={blogId!} handleSubmite={handleSubmit} />
                </MyDialog>
            ):(
                <LoadingComponent/>
            )
        }
        </>
    )
}