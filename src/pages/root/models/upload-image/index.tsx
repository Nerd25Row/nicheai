import { useNavigate, useSearchParams } from "react-router-dom";
import { useProcessUploadedImageMutation } from "../../../../features/model/useProcessUploadedImageMutation";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import { ProcessingImage } from "../../../../components";
import { Button } from "../../../../components/ui/button";

const ImageUploadPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modelSlug = searchParams.get("modelSlug");
  const modelId = searchParams.get("modelId");
  const modelOptionId = searchParams.get("modelOptionId");
  const modelName = searchParams.get("modelName");
  const modelDescription = searchParams.get("modelDescription");

  const processUploadedImageMutation = useProcessUploadedImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const isProcessing = processUploadedImageMutation.isPending;

  const handleProcessFile = useCallback(
    async (file: File) => {
      if (!modelSlug) {
        setError("Model slug is required");
        return;
      }

      setError(null);

      try {
        await processUploadedImageMutation.mutateAsync({
          modelSlug: modelSlug,
          imageFile: file,
          modelId: modelId || undefined,
          modelOptionId: modelOptionId || undefined,
          r2Url: true,
          // Pass context for setResult
          originalFile: file,
          originalFileName: file.name,
          modelName: modelName,
          // Navigate on success
          onSuccess: () => {
            navigate("/models/upload-image/results");
          },
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to process image. Please try again.";
        setError(errorMessage);
      }
    },
    [
      modelSlug,
      modelId,
      modelOptionId,
      modelName,
      processUploadedImageMutation,
      navigate,
    ]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      // Process the first file
      handleProcessFile(acceptedFiles[0]);
    },
    [handleProcessFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxSize: 30 * 1024 * 1024,
    multiple: false, 
    noClick: true,
    noKeyboard: true,
    disabled: isProcessing,
  });

  const handleButtonClick = () => {
    if (fileInputRef.current && !isProcessing) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && !isProcessing) {
      handleProcessFile(files[0]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1E2128] flex items-center justify-center px-4 py-6 md:px-6">
      <div className="flex flex-col items-center justify-center w-full md:w-[616px] h-auto min-h-[472px] rotate-0 opacity-100 gap-8 md:gap-12 bg-[#1E2128] rounded-xl p-6 md:p-8">
        <div className="flex flex-col w-full max-w-[518px] h-auto rotate-0 opacity-100 gap-4">
          <span className="w-full h-auto rotate-0 opacity-100 font-inter font-bold text-2xl md:text-[32px] leading-[40px] tracking-[-2%] text-center text-white">
            {modelName}
          </span>
          <span className="w-full h-auto rotate-0 opacity-100 font-inter font-normal text-base leading-6 tracking-[0%] text-center text-[#CACFDA]">
            {modelDescription}
          </span>
        </div>

        {error && (
          <Alert variant="destructive" className="max-w-md">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
                disabled={isProcessing}
                className="w-full md:w-[263px] h-10 rotate-0 opacity-100 gap-2 rounded-lg pr-4 pl-4 bg-[#00FFFF] shadow-[0px_-20px_20px_0px_#01FF013D_inset] flex items-center justify-center hover:bg-[#00E6E6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="w-[96px] h-6 rotate-0 opacity-100 font-inter font-bold text-base leading-6 tracking-[0%] align-middle text-[#1D2027]">
                  Browse files
                </span>
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isProcessing}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadPage;
