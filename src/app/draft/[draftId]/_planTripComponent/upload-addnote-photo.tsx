import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Button } from "@/src/components/UI/Button";
import { UploadCloundinary } from "@/src/lib/backend/uploadCloundinary";
import { url } from "inspector";
import { useMutation, useUpdateMyPresence } from "@liveblocks/react";
import { UploadChangeParam } from "antd/es/upload";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface UploadAddNotePhotoProps {
  dateId?: string;
  placeIndex?: number;
  noteIndex?: number;
  listImage: UploadFile[];
}
const UploadAddNotePhoto = ({
  dateId,
  placeIndex,
  noteIndex,
  listImage,
}: UploadAddNotePhotoProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const updateMyPresence = useUpdateMyPresence();

  const UpdateListImage = useMutation(({ storage }, fileList: UploadFile[]) => {
    const layers = storage.get("layers");
    const layer = layers.get(dateId);

    const listDestination = layer?.get("ListDestination");
    const { noteList } = listDestination[placeIndex];
    noteList[noteIndex]["listImage"] = fileList;

    layer?.set("ListDestination", listDestination);
  }, []);

  // แปลง file ตอน Preview
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = async (event: UploadChangeParam<UploadFile<any>>) => {
    setLoading(true);
    if (event.file.status === "uploading") {
      //Upload Image
      const newFile = event.file.originFileObj as File;
      const { id, url } = await UploadCloundinary(newFile, newFile.uid);
      const newImage: UploadFile = {
        uid: id,
        name: id,
        url: url,
      };
      let newList;
      if (listImage === null) {
        newList = [newImage];
      } else {
        newList = [...listImage, newImage];
      }
      //add to liveblock
      UpdateListImage(newList);
    } else {
      const afterRemove = listImage.filter((img) => img.uid !== event.file.uid);
      UpdateListImage(afterRemove);
    }

    setLoading(false);
  };
  const uploadButton = (
    <div onClick={(e) => updateMyPresence({ focusedId: e.target.id })}>
      {loading ? (
        <div
          style={{ textAlign: "center" }}
          id={`Image${dateId}${noteIndex}`}
          onBlur={(e) => updateMyPresence({ focusedId: null })}
        >
          <PlusOutlined id={`Image${dateId}${noteIndex}`} />
          <div style={{ marginTop: 8 }} id={`Image${dateId}${noteIndex}`}>
            Uploading...
          </div>
        </div>
      ) : (
        <div id={`Image${dateId}${noteIndex}`}>
          <PlusOutlined id={`Image${dateId}${noteIndex}`} />
          <div style={{ marginTop: 8 }} id={`Image${dateId}${noteIndex}`}>
            Upload
          </div>
        </div>
      )}
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={listImage}
        onChange={(e) => handleChange(e)}
        onPreview={handlePreview}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {/* <Button onClick={UpdateListImage}>
  Reset listImage
</Button> */}
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadAddNotePhoto;
