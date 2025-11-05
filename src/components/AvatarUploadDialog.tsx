import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useUploadProfileAvatarMutation } from "../features/user/useUploadProfileAvatarMutation";
import type { Dispatch, SetStateAction } from "react";

interface AvatarUploadDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onUploadSuccess?: (url: string) => void;
  currentAvatarUrl?: string | null;
}

const AvatarUploadDialog: React.FC<AvatarUploadDialogProps> = ({
  open,
  setOpen,
  onUploadSuccess,
  currentAvatarUrl,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const uploadAvatarMutation = useUploadProfileAvatarMutation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB max for avatars
    multiple: false,
    noClick: false,
    noKeyboard: false,
  });

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const publicUrl = await uploadAvatarMutation.mutateAsync(selectedFile);

      // Call success callback
      if (onUploadSuccess) {
        onUploadSuccess(publicUrl);
      }

      // Reset and close
      handleRemove();
      setOpen(false);
    } catch (error) {
      // Error is handled by the mutation's onError
      // The mutation will throw, but we can also log it here if needed
      console.error("Upload failed:", error);
    }
  };

  const handleClose = () => {
    if (!uploadAvatarMutation.isPending) {
      handleRemove();
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex flex-col w-full max-w-[500px] rounded-3xl border border-[#4D5057] bg-[#2E3137] p-6 md:p-8">
        <AlertDialogHeader className="relative">
          <Button
            onClick={handleClose}
            disabled={uploadAvatarMutation.isPending}
            className="absolute -top-2 -right-2 w-8 h-8 p-0 bg-transparent hover:bg-[#4D5057]/50 text-white disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </Button>
          <AlertDialogTitle className="font-inter font-bold text-xl md:text-2xl text-white text-left">
            Upload Profile Picture
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-col gap-6 mt-4">
          {/* Current Avatar Preview */}
          {currentAvatarUrl && !previewUrl && (
            <div className="flex flex-col items-center gap-4">
              <span className="font-inter font-normal text-sm text-[#B6BCCA]">
                Current Avatar
              </span>
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#4D5057]">
                <img
                  src={currentAvatarUrl}
                  alt="Current avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Upload Area */}
          {!previewUrl ? (
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center w-full h-auto min-h-[200px] rounded-xl border border-dashed p-6 transition-colors cursor-pointer ${
                isDragActive
                  ? "border-[#00FFFF] bg-[#2E3137]/80"
                  : "border-[#7E8390] bg-[#1D2027]"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Upload
                    className={`w-8 h-8 transition-colors ${
                      isDragActive ? "text-[#00FFFF]" : "text-[#B6BCCA]"
                    }`}
                  />
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <span
                    className={`font-inter font-normal text-sm leading-5 transition-colors ${
                      isDragActive ? "text-[#00FFFF]" : "text-[#CACFDA]"
                    }`}
                  >
                    {isDragActive
                      ? "Drop the image here"
                      : "Drag & drop an image here, or click to select"}
                  </span>
                  <span className="font-inter font-medium text-xs text-[#B6BCCA]">
                    Max. File Size: 5MB
                  </span>
                  <span className="font-inter font-normal text-xs text-[#7E8390]">
                    Supports: JPG, PNG, GIF, WebP
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Preview */
            <div className="flex flex-col items-center gap-4">
              <span className="font-inter font-normal text-sm text-[#B6BCCA]">
                Preview
              </span>
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-[#4D5057]">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  onClick={handleRemove}
                  disabled={uploadAvatarMutation.isPending}
                  className="absolute top-2 right-2 w-8 h-8 p-0 bg-[#1D2027]/90 hover:bg-[#1D2027] text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {selectedFile && (
                <span className="font-inter font-normal text-xs text-[#7E8390]">
                  {selectedFile.name}
                </span>
              )}
            </div>
          )}

          {/* Error Message */}
          {uploadAvatarMutation.isError && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-3">
              <span className="font-inter font-normal text-sm text-red-400">
                {uploadAvatarMutation.error instanceof Error
                  ? uploadAvatarMutation.error.message
                  : "Failed to upload avatar. Please try again."}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              onClick={handleClose}
              disabled={uploadAvatarMutation.isPending}
              className="px-6 py-2 rounded-lg bg-transparent hover:bg-[#4D5057]/50 text-[#B6BCCA] border border-[#4D5057] disabled:opacity-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploadAvatarMutation.isPending}
              className="px-6 py-2 rounded-lg bg-[#00FFFF] hover:bg-[#00E6E6] text-[#1D2027] font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-[0px_-20px_20px_0px_#01FF013D_inset]"
            >
              {uploadAvatarMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AvatarUploadDialog;
