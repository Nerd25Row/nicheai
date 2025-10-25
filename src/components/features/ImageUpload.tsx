import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ProcessingImage from "./ProcessingImage";
import { Button } from "../ui/button";

const ImageUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Files dropped:", acceptedFiles,uploadedFiles);
    setUploadedFiles(acceptedFiles);
    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxSize: 30 * 1024 * 1024,
    multiple: true,
    noClick: true,
    noKeyboard: true,
  });

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log("Files selected:", Array.from(files));
      setUploadedFiles(Array.from(files));
      setIsProcessing(true);

      // Simulate processing time
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1E2128] flex items-center justify-center px-4 py-6 md:px-6">
      <div className="flex flex-col items-center justify-center w-full md:w-[616px] h-auto min-h-[472px] rotate-0 opacity-100 gap-8 md:gap-12 bg-[#1E2128] rounded-xl p-6 md:p-8">
        <div className="flex flex-col w-full max-w-[518px] h-auto rotate-0 opacity-100 gap-4">
          <span className="w-full h-auto rotate-0 opacity-100 font-inter font-bold text-2xl md:text-[32px] leading-[40px] tracking-[-2%] text-center text-white">
            Segmentation model
          </span>
          <span className="w-full h-auto rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-[0%] text-center text-[#CACFDA]">
            Advanced image segmentation using state-of-the-art deep learning
          </span>
        </div>

        {isProcessing ? (
          <ProcessingImage />
        ) : (
          <div
            className={`flex justify-center w-full md:w-[616px] h-auto min-h-[344px] rotate-0 opacity-100 gap-3 rounded-xl border border-dashed p-6 transition-colors ${
              isDragActive
                ? "border-[#00FFFF] bg-[#2E3137]/80"
                : "border-[#7E8390] bg-[#2E3137]"
            }`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center w-full md:w-[263px] h-[218px] rotate-0 opacity-100 gap-6">
              <div className="w-[42px] h-[42px] rotate-0 opacity-100">
                <img
                  src="/assets/images/upload.svg"
                  className={`w-[42px] h-[42px] rotate-0 opacity-100 object-cover transition-colors ${
                    isDragActive ? "opacity-80" : "opacity-100"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center w-full md:w-[263px] gap-1 sm:gap-1.5 text-center">
                <span
                  className={`w-full md:w-[263px] rotate-0 opacity-100 font-inter font-normal text-sm leading-5 tracking-[1%] transition-colors ${
                    isDragActive ? "text-[#00FFFF]" : "text-[#CACFDA]"
                  }`}
                >
                  {isDragActive
                    ? "Drop files here..."
                    : "Drag & drop your file to start uploading"}
                </span>

                <span className="w-full md:w-[122px] rotate-0 opacity-100 font-inter font-medium text-xs leading-[18px] tracking-[1%] text-[#B6BCCA]">
                  Max. File Size: 30MB
                </span>
              </div>

              <div className="flex items-center justify-between w-[201px] h-[18px] rotate-0 opacity-100 gap-3">
                <div className="w-[80px] h-[0.970588207244873px] rotate-0 opacity-100 bg-[#4D5057]" />
                <span className="w-[17px] h-[18px] rotate-0 opacity-100 font-inter font-normal text-xs leading-5 tracking-[0%] text-center text-[#B6BCCA]">
                  OR
                </span>
                <div className="w-[80px] h-[0.970588207244873px] rotate-0 opacity-100 bg-[#4D5057]" />
              </div>

              <Button
                onClick={handleButtonClick}
                className="w-full md:w-[263px] h-10 rotate-0 opacity-100 gap-2 rounded-lg pr-4 pl-4 bg-[#00FFFF] shadow-[0px_-20px_20px_0px_#01FF013D_inset] flex items-center justify-center hover:bg-[#00E6E6] transition-colors"
              >
                <span className="w-[96px] h-6 rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-[#1D2027]">
                  Browse files
                </span>
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
