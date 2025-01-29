"use client"

import { RegisterDialogProps } from "../models/components/registerDialog"
import MyDialog from "@/src/components/UI/MyDialog";
import UploadImg from "./uploadImage";
import { UploadCloundinary } from "../lib/backend/uploadCloundinary";
import React, { useState } from "react";
import LoadingComponent from "./UI/Loading";


interface UploadImgDialog {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    blogId: string
    handleUploadPhoto: (file: File, blogId: string) => void
}

export const UploadImgDialog = ({
    isOpen,
    setIsOpen,
    blogId,
    handleUploadPhoto
}: UploadImgDialog) => {

    return (
        // TODO แก้ UI loading 
        <MyDialog title="" isOpen={isOpen} setIsOpen={setIsOpen} >
            <UploadImg blogId={blogId!} handleSubmite={handleUploadPhoto} />
        </MyDialog>
    )
}