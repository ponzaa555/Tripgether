import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useMutation } from '@liveblocks/react';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadCloundinary } from '@/src/lib/backend/uploadCloundinary';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });


interface UploadAlbumImage {
  listImage: UploadFile[],
  index: number
}

const UploadAlbumImage = ({ listImage, index }: UploadAlbumImage) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const UpdateListImage = useMutation((
    { storage },
    fileList: UploadFile[]
  ) => {
    const layers = storage.get("layers")
    const albumLayer = layers.get("Album")
    const listAlbum = albumLayer?.get("albumList")
    const album = listAlbum[index]

    album.listUrl = fileList

    albumLayer?.set("albumList" , listAlbum)


  }, [])


  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = async (event: UploadChangeParam<UploadFile<any>>) => {
    setLoading(true)
    if (event.file.status === "uploading") {
      //Upload Image
      const newFile = event.file.originFileObj as File
      const { id, url } = await UploadCloundinary(newFile, newFile.uid)
      const newImage: UploadFile = {
        uid: id,
        name: id,
        url: url
      }
      let newList;
      if (listImage === null) {
        newList = [newImage]
      }
      else {
        newList = [...listImage, newImage]
      }
      //add to liveblock
      UpdateListImage(newList);
    } else {
      const urlIndex = listImage.findIndex(img => img.url === event.file.url)
      const afterRemove = listImage.filter((e, i) => i !== urlIndex);
      UpdateListImage(afterRemove);
    }

    setLoading(false);
  }

  const uploadButton = (
    <div>
      {loading ? (
        <div style={{ textAlign: 'center' }} >
          <PlusOutlined />
          <div style={{ marginTop: 8 }} >Uploading...</div>
        </div>
      ) : (
        <div >
          <PlusOutlined />
          <div style={{ marginTop: 8 }} >Upload</div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={listImage}
        onPreview={handlePreview}
        onChange={(e) => handleChange(e)}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadAlbumImage;