import React, { useState } from 'react';

import { CldImage } from 'next-cloudinary';




interface UploadImgProps{
  blogId: string,
  handleSubmite : (file:File , blogId : string ) => void
}
const UploadImg = ({blogId , handleSubmite}:UploadImgProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: File[] = Array.from(selectedFiles);
    const validFiles = newFiles.filter((file) => {
      const isValid =
        (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) ||
        (file.type.startsWith('video/') && file.size <= 100 * 1024 * 1024);

      if (!isValid) {
        setError(
          `Invalid file: ${file.name}. Images must be <= 10MB, and videos <= 100MB.`
        );
      }
      return isValid;
    });

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    setError(null); // Clear error if valid
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles) {
      const newFiles: File[] = Array.from(droppedFiles);
      const validFiles = newFiles.filter((file) => {
        const isValid =
          (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) ||
          (file.type.startsWith('video/') && file.size <= 100 * 1024 * 1024);

        if (!isValid) {
          setError(
            `Invalid file: ${file.name}. Images must be <= 10MB, and videos <= 100MB.`
          );
        }
        return isValid;
      });

      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setError(null); // Clear error if valid
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Upload Cover</h3>
      {files.length === 0 && (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-100 hover:bg-gray-50"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            id="file-upload"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="block cursor-pointer">
            <div className="flex flex-col items-center text-gray-500">
              <div className="text-4xl mb-2">📤</div>
              <p className="text-sm">
                Drop your file here, or{' '}
                <span className="text-blue-500 underline">browse</span>
              </p>
              <p className="text-xs mt-1">
                File formats: image/video (max 8 files)
              </p>
              <p className="text-xs">Image max 10MB, Video max 100MB</p>
            </div>
          </label>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="mt-4  w-full">
        {  (files.map((file, index) => (
          <div key={index} className="relative">
            {file.type.startsWith('image/') ? (
              <CldImage
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full  object-cover rounded-md shadow-md"
                removeBackground
                width={300}
                height={200}
              />
            ) : (
              <video
                src={URL.createObjectURL(file)}
                controls
                className="w-full h-32 object-cover rounded-md shadow-md"
              />
            )}
            <button
              onClick={() => handleRemoveFile(index)}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1"
            >
              ✕
            </button>
          </div>
        )))
        }
      </div>
      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:bg-gray-300"
        disabled={files.length === 0}
        onClick={() => handleSubmite(files[0] , blogId)}
      >
        Save
      </button>
    </div>
  );
};

export default UploadImg;
