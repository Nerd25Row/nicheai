import React from "react";
import { ChevronDown, Download, Eye, MoreVertical, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useGetAllCompanyGalleryQuery } from "../features/gallery/useGetAllCompanyGalleryQuery";
import { Alert, AlertDescription } from "./ui/alert";
import type { GalleryItem } from "../services/gallery/gallleryService";

const Card: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="rounded-[20px] bg-gray-200 dark:bg-[#2E3137] p-6 shadow-[0px_1px_2px_0px_#1018280D] border border-[#2F2B4326]">
    {children}
  </div>
);

const Gallery: React.FC = () => {
  const { data: galleryItems, isLoading, error } = useGetAllCompanyGalleryQuery();

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
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
    if (!galleryItems || galleryItems.length === 0) return;
    
    for (const item of galleryItems) {
      if (item.processed_image_url) {
        const filename = item.original_image_name || `gallery_${item.id}.png`;
        await handleDownload(item.processed_image_url, filename);
      }
    }
  };

  return (
    <div className="min-h-screen w-full ">
      <div className="mx-auto max-w-[1120px] px-4 md:px-8 py-6 md:py-8 space-y-8">
        {/* Filters / Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
            {/* All Models */}
            <DropdownMenu>
              <DropdownMenuTrigger className="h-10 rounded-xl border border-[#4D5057] bg-gray-200 dark:bg-[#1D2027] dark:text-white px-4 flex items-center justify-between">
                <span className="font-inter text-base font-medium text-black dark:text-white">
                  All Models
                </span>
                <ChevronDown className="ml-2 h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-40">
                <DropdownMenuItem>Segmentation</DropdownMenuItem>
                <DropdownMenuItem>Fusion</DropdownMenuItem>
                <DropdownMenuItem>Immersion</DropdownMenuItem>
                <DropdownMenuItem>All</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort by Date */}
            <DropdownMenu>
              <DropdownMenuTrigger className="h-10 rounded-xl border border-[#4D5057] bg-gray-200  dark:bg-[#1D2027] dark:text-white px-4 flex items-center justify-between">
                <span className="font-inter text-base font-medium">
                  Sort by Date
                </span>
                <ChevronDown className="ml-2 h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-48">
                <DropdownMenuItem>Newest first</DropdownMenuItem>
                <DropdownMenuItem>Oldest first</DropdownMenuItem>
                <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            onClick={handleDownloadAll}
            disabled={!galleryItems || galleryItems.length === 0}
            className="h-10 w-full md:w-[157px] rounded-lg bg-[#00FFFF] text-[#1D2027] font-inter font-bold shadow-[0px_-20px_20px_0px_#01FF013D_inset] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="inline-flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download all
            </span>
          </Button>
        </div>
        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#00FFFF]" />
          </div>
        )}

        {/* Error state */}
        {error && (
          <Alert variant="destructive" className="max-w-md">
            <AlertDescription>
              Failed to load gallery: {error.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Empty state */}
        {!isLoading && !error && (!galleryItems || galleryItems.length === 0) && (
          <Alert className="max-w-md">
            <AlertDescription>
              No images in your gallery yet. Process and save images to see them here.
            </AlertDescription>
          </Alert>
        )}

        {/* Cards grid */}
        {!isLoading && !error && galleryItems && galleryItems.length > 0 && (
          <div
            className="
              grid gap-6
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {galleryItems.map((item: GalleryItem) => (
              <Card key={item.id}>
                {/* Media */}
                <div className="relative w-full rounded-lg overflow-hidden border border-gray-600 dark:bg-[#1F2937]">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-[url('/assets/images/segmentation.svg')] bg-cover bg-center opacity-80" />
                  {/* Foreground image in a stable aspect box */}
                  <div className="relative aspect-[16/9] flex items-center justify-center">
                    {item.processed_image_url ? (
                      <img
                        src={item.processed_image_url}
                        alt={item.original_image_name || "Processed image"}
                        className="h-40 md:h-44 w-auto object-contain"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = "/assets/images/segmentation_female_image_1.png";
                        }}
                      />
                    ) : (
                      <img
                        src="/assets/images/segmentation_female_image_1.png"
                        alt="Placeholder"
                        className="h-40 md:h-44 w-auto object-contain"
                      />
                    )}
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-4 flex flex-col md:flex-row items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-inter text-sm font-medium dark:text-white truncate">
                      {item.original_image_name || `Image ${item.id.slice(0, 8)}`}
                    </p>
                    <p className="font-inter text-xs text-gray-600 dark:text-[#B6BCCA]">
                      {formatDate(item.created_at)}
                    </p>
                  </div>
                  {item.file_size_mb && (
                    <div className="shrink-0 inline-flex items-center rounded-2xl border border-[#72E6E5] px-2 py-0.5">
                      <span className="font-inter text-xs font-medium text-[#72E6E5] whitespace-nowrap">
                        {item.file_size_mb.toFixed(2)} MB
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (item.processed_image_url) {
                        window.open(item.processed_image_url, "_blank");
                      }
                    }}
                    disabled={!item.processed_image_url}
                    className="h-10 flex-1 rounded-lg border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (item.processed_image_url) {
                        const filename = item.original_image_name || `gallery_${item.id}.png`;
                        handleDownload(item.processed_image_url, filename);
                      }
                    }}
                    disabled={!item.processed_image_url}
                    className="h-10 flex-1 rounded-lg border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 w-10 p-0 rounded-lg border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] text-black dark:text-[#D6D9E2]"
                    aria-label="More options"
                  >
                    <MoreVertical className="h-5 w-5 " />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Footer info */}
        {!isLoading && !error && galleryItems && galleryItems.length > 0 && (
          <div className="pt-2">
            <span className="font-inter text-sm text-gray-600 dark:text-[#B6BCCA]">
              {galleryItems.length === 1
                ? "Showing 1 image"
                : `Showing 1–${galleryItems.length} of ${galleryItems.length} images`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
