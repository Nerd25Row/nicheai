import React from "react";
import { ChevronDown, Download, Eye, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Card: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="rounded-[20px] bg-[#2E3137] p-6 shadow-[0px_1px_2px_0px_#1018280D] border border-[#2F2B4326]">
    {children}
  </div>
);

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#1E2128]">
      <div className="mx-auto max-w-[1120px] px-4 md:px-8 py-6 md:py-8 space-y-8">
        {/* Filters / Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
            {/* All Models */}
            <DropdownMenu>
              <DropdownMenuTrigger className="h-10 rounded-xl border border-[#4D5057] bg-[#1D2027] text-white px-4 flex items-center justify-between">
                <span className="font-inter text-base font-medium">
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
              <DropdownMenuTrigger className="h-10 rounded-xl border border-[#4D5057] bg-[#1D2027] text-white px-4 flex items-center justify-between">
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

          <Button className="h-10 w-full md:w-[157px] rounded-lg bg-[#00FFFF] text-[#1D2027] font-inter font-bold shadow-[0px_-20px_20px_0px_#01FF013D_inset]">
            <span className="inline-flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download all
            </span>
          </Button>
        </div>

        {/* Cards grid */}
        <div
          className="
            grid gap-6
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              {/* Media */}
              <div className="relative w-full rounded-lg overflow-hidden border border-gray-600 bg-[#1F2937]">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-[url('/assets/images/segmentation.svg')] bg-cover bg-center opacity-80" />
                {/* Foreground image in a stable aspect box */}
                <div className="relative aspect-[16/9] flex items-center justify-center">
                  <img
                    src="/assets/images/segmentation_female_image_1.png"
                    alt="Processed"
                    className="h-40 md:h-44 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="mt-4 flex flex-col md:flex-row items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-inter text-sm font-medium text-white truncate">
                    image_001.jpg
                  </p>
                  <p className="font-inter text-xs text-[#B6BCCA]">
                    Jan 15, 2025
                  </p>
                </div>
                <div className="shrink-0 inline-flex items-center rounded-2xl border border-[#72E6E5] px-2 py-0.5">
                  <span className="font-inter text-xs font-medium text-[#72E6E5] whitespace-nowrap">
                    Segmentation model
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  className="h-10 flex-1 rounded-lg border-[#4D5057] bg-[#2E3137] text-white"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button
                  variant="outline"
                  className="h-10 flex-1 rounded-lg border-[#4D5057] bg-[#2E3137] text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0 rounded-lg border-[#4D5057] bg-[#2E3137] text-white"
                  aria-label="More options"
                >
                  <MoreVertical className="h-5 w-5 text-[#D6D9E2]" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-2">
          <span className="font-inter text-sm text-[#B6BCCA]">
            Showing 1–6 of 47 images
          </span>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
