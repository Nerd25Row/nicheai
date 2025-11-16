import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FaSync } from "react-icons/fa";
import { Download, Loader2 } from "lucide-react";
import { useProcessedImageStore } from "../store/processedImage/processedImageStore";
import { Alert, AlertDescription } from "./ui/alert";
import { useProcessUploadedImageMutation } from "../features/model/useProcessUploadedImageMutation";
import { useSaveToGalleryMutation } from "../features/gallery/useSaveToGalleryMutation";
import { uploadBase64Image } from "../services/gallery/gallleryService";

type ResultCardProps = {
  model: string;
  size: string;
  img: string;
  bg?: string;
  onDownload?: () => void;
  onSave?: () => void;
  isSaving?: boolean;
};
const ResultCard: React.FC<ResultCardProps> = ({
  model,
  size,
  img,
  bg = "bg-[url('/assets/images/segmentation.svg')]",
  onDownload,
  onSave,
  isSaving = false,
}) => (
  <div className="rounded-[20px] border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] p-6 space-y-3">
    {/* Media */}
    <div
      className={`relative rounded-lg border border-gray-600 ${bg} bg-cover bg-no-repeat bg-center overflow-hidden`}
    >
      {/* Stable aspect ratio so cards don't jump */}
      <div className="aspect-[16/9] flex items-center justify-center bg-[#1F2937]">
        <img
          src={img}
          alt={`${model} result`}
          className="h-44 md:h-48 w-auto object-contain"
        />
      </div>
    </div>

    {/* Meta */}
    <div className="flex items-center justify-between">
      <span className="font-inter text-sm font-medium dark:text-white">{model}</span>
      <span className="font-inter text-xs text-gray-600 dark:text-[#B6BCCA]">{size}</span>
    </div>

    {/* Actions */}
    <div className="flex gap-3">
      <Button
        onClick={onDownload}
        className="h-10 flex-1 rounded-lg border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] text-black dark:text-white shadow-[0px_1px_2px_0px_#1018280D] hover:bg-gray-300 dark:hover:bg-[#3A3D44]"
      >
        <Download className="mr-2 h-4 w-4  " />
        Download
      </Button>
      <Button
        className="h-10 flex-1 rounded-lg bg-[#00FFFF] text-black shadow-[0px_-20px_20px_0px_#01FF013D_inset] hover:bg-[#00E6E6] disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onSave}
        disabled={isSaving}
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Save
          </>
        )}
      </Button>
    </div>
  </div>
);

const UploadImageResult: React.FC = () => {
  const navigate = useNavigate();
  const saveToGalleryMutation = useSaveToGalleryMutation();
  const processUploadedImageMutation = useProcessUploadedImageMutation();
  const { result } = useProcessedImageStore();
  const isReprocessing = processUploadedImageMutation.isPending;
  const [savingImageIndex, setSavingImageIndex] = useState<number | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  // Redirect to upload page if no result
  useEffect(() => {
    if (!result) {
      navigate("/models/upload-image");
    }
  }, [result, navigate]);

  // Format date helper
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Get image URL from result
  const getImageUrl = (index: number): string | null => {
    if (!result?.response) return null;
    if (
      result.response.result_image &&
      result.response.result_image.length > index
    ) {
      return `data:image/png;base64,${result.response.result_image[index]}`;
    }

    return null;
  };

  // Get all processed images
  const processedImages = (): Array<{ url: string; mimeType?: string }> => {
    if (!result?.response) return [];

    // Fall back to base64
    if (
      result.response.result_image &&
      result.response.result_image.length > 0
    ) {
      return result.response.result_image.map((img) => ({
        url: `data:image/png;base64,${img}`,
        mimeType: "image/png",
      }));
    }

    return [];
  };

  // Handle download
  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Handle download all
  const handleDownloadAll = async () => {
    const images = processedImages();
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const filename = result?.originalFileName
        ? `${result.originalFileName.replace(/\.[^/.]+$/, "")}_${i + 1}.png`
        : `processed_${i + 1}.png`;
      await handleDownload(image.url, filename);
    }
  };

  // Handle reprocess
  const handleReprocess = async () => {
    try {
      await processUploadedImageMutation.mutateAsync({
        modelSlug: result?.modelSlug || "",
        imageFile: result?.originalFile || undefined,
        modelId: result?.modelId || undefined,
        modelOptionId: result?.modelOptionId || undefined,
        r2Url: true,
        // Pass context for setResult
        originalFile: result?.originalFile || null,
        originalFileName: result?.originalFileName || "",
        modelName: result?.modelName,
      });
    } catch (error) {
      console.error("Reprocess failed:", error);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen w-full bg-[#1E2128] flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertDescription>
            No processed results found. Redirecting to upload page...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const images = processedImages();

  // Create object URL for original file and cleanup on unmount
  const [originalImageUrl, setOriginalImageUrl] = React.useState<string | null>(
    null
  );

  useEffect(() => {
    if (result.originalFile) {
      const url = URL.createObjectURL(result.originalFile);
      setOriginalImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setOriginalImageUrl(null);
    }
  }, [result.originalFile]);

  // Handle save to gallery
  const handleSave = async (imageIndex: number) => {
    if (!result?.modelId || !result?.response) {
      setSaveError("Missing required data to save image");
      return;
    }

    const imageUrl = getImageUrl(imageIndex);
    if (!imageUrl) {
      setSaveError("Image not found");
      return;
    }

    setSaveError(null);
    setSaveSuccess(null);
    setSavingImageIndex(imageIndex);

    try {
      // Extract base64 data from data URL
      const base64Data = imageUrl;

      // Upload base64 image to storage
      const uploadedUrl = await uploadBase64Image(
        base64Data,
        result.originalFileName
          ? `${result.originalFileName.replace(/\.[^/.]+$/, "")}_${imageIndex + 1}.png`
          : `processed_${imageIndex + 1}.png`
      );

      // Calculate file size in MB
      const base64String = base64Data.startsWith("data:")
        ? base64Data.split(",")[1]
        : base64Data;
      const fileSizeBytes = (base64String.length * 3) / 4;
      const fileSizeMb = fileSizeBytes / (1024 * 1024);

      // Save to gallery
      await saveToGalleryMutation.mutateAsync({
        modelId: result.modelId,
        processedImageUrl: uploadedUrl,
        fileSizeMb: fileSizeMb,
        modelOptionId: result.modelOptionId,
      });

      // Show success message
      setSaveSuccess("Image saved to gallery successfully!");
      setSaveError(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(null);
      }, 3000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to save image to gallery";
      setSaveError(errorMessage);
      console.error("Save to gallery failed:", error);
    } finally {
      setSavingImageIndex(null);
    }
  };
  return (
    <div className="min-h-screen w-full ">
      <div className="mx-auto w-full max-w-[1120px] px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-12">
        {/* Title + subtitle */}
        <div className="mx-auto max-w-xl text-center space-y-2">
          <h1 className="font-inter text-2xl md:text-3xl font-bold dark:text-white">
            {result.modelName || "Model"} results
          </h1>
          <p className="font-inter text-base text-gray-600 dark:text-[#CACFDA]">
            AI-generated variations of your uploaded image
          </p>
        </div>

        {/* Original Image row */}
        <section className="space-y-3">
          <h2 className="font-inter text-base md:text-lg font-bold dark:text-white">
            Original Image
          </h2>

          <div className="rounded-[20px] border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                {originalImageUrl ? (
                  <img
                    src={originalImageUrl}
                    className="h-20 w-20 rounded-lg bg-[#FBFBFB] object-cover"
                    alt="Original"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-lg bg-[#4D5057] flex items-center justify-center">
                    <span className="dark:text-[#B6BCCA] text-xs">No preview</span>
                  </div>
                )}
                <div className="space-y-0.5">
                  <p className="font-inter text-sm dark:text-[#CACFDA]">
                    {result.originalFileName || "Unknown file"}
                  </p>
                  <p className="font-inter text-xs text-gray-600 dark:text-[#B6BCCA]">
                    Uploaded on {formatDate(result.processedAt)}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleReprocess}
                disabled={isReprocessing}
                className="h-10 w-full md:w-auto rounded-lg border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] text-black dark:text-white hover:bg-gray-300 dark:hover:bg-[#3A3D44]  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isReprocessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-black dark:text-white" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <FaSync className="mr-2 h-4 w-4 text-black dark:text-white " />
                    Reprocess
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* Controls row */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="font-inter text-xl font-bold dark:text-white">
              AI Generated Results
            </h3>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleDownloadAll}
                disabled={images.length === 0}
                className="h-10 w-full sm:w-auto rounded-lg bg-[#00FFFF] text-black shadow-[0px_-20px_20px_0px_#01FF013D_inset] hover:bg-[#00E6E6] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="mr-2 h-4 w-4" />
                Download all
              </Button>

              <Button className="h-10 w-full sm:w-auto rounded-lg border border-[#4D5057] bg-gray-200 hover:bg-gray-300 dark:bg-[#2E3137] text-black dark:text-white dark:hover:bg-[#3A3D44]">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                Share
              </Button>
            </div>
          </div>
          {/* Save error alert */}
          {saveError && (
            <Alert variant="destructive" className="max-w-md">
              <AlertDescription>{saveError}</AlertDescription>
            </Alert>
          )}

          {/* Save success alert */}
          {saveSuccess && (
            <Alert className="max-w-md bg-[#00C0C1]/20 border-[#00C0C1]">
              <AlertDescription className="text-[#00C0C1]">
                {saveSuccess}
              </AlertDescription>
            </Alert>
          )}

          {/* Results grid */}
          {images.length === 0 ? (
            <Alert className="max-w-md">
              <AlertDescription>
                No processed images found in the response.
              </AlertDescription>
            </Alert>
          ) : (
            <div
              className="
                grid gap-5
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {images.map((image, i) => {
                const imageUrl = getImageUrl(i);
                if (!imageUrl) return null;

                return (
                  <ResultCard
                    key={i}
                    model={result.modelName || "Result"}
                    size={image.mimeType || "image/png"}
                    img={imageUrl}
                    onSave={() => handleSave(i)}
                    isSaving={savingImageIndex === i}
                    onDownload={() =>
                      handleDownload(
                        imageUrl,
                        result.originalFileName
                          ? `${result.originalFileName.replace(
                              /\.[^/.]+$/,
                              ""
                            )}_${i + 1}.png`
                          : `processed_${i + 1}.png`
                      )
                    }
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UploadImageResult;
