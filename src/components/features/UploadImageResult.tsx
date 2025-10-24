import React from "react";
import { Button } from "../ui/button";
import { FaSync } from "react-icons/fa";
import { Download } from "lucide-react";

type ResultCardProps = {
  model: string;
  size: string;
  img: string;
  bg?: string; // tailwind bg-[url(...)]
};
const ResultCard: React.FC<ResultCardProps> = ({
  model,
  size,
  img,
  bg = "bg-[url('/assets/images/segmentation.svg')]",
}) => (
  <div className="rounded-[20px] border border-[#4D5057] bg-[#2E3137] p-6 space-y-3">
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
      <span className="font-inter text-sm font-medium text-white">{model}</span>
      <span className="font-inter text-xs text-[#B6BCCA]">{size}</span>
    </div>

    {/* Actions */}
    <div className="flex gap-3">
      <Button className="h-10 flex-1 rounded-lg border border-[#4D5057] bg-[#2E3137] text-white shadow-[0px_1px_2px_0px_#1018280D] hover:bg-[#3A3D44]">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button className="h-10 flex-1 rounded-lg bg-[#00FFFF] text-black shadow-[0px_-20px_20px_0px_#01FF013D_inset] hover:bg-[#00E6E6]">
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Save
      </Button>
    </div>
  </div>
);

const UploadImageResult: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#1E2128]">
      <div className="mx-auto w-full max-w-[1120px] px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-12">
        {/* Title + subtitle */}
        <div className="mx-auto max-w-xl text-center space-y-2">
          <h1 className="font-inter text-2xl md:text-3xl font-bold text-white">
            Segmentation model results
          </h1>
          <p className="font-inter text-base text-[#CACFDA]">
            AI-generated variations of your uploaded image
          </p>
        </div>

        {/* Original Image row */}
        <section className="space-y-3">
          <h2 className="font-inter text-base md:text-lg font-bold text-white">Original Image</h2>

          <div className="rounded-[20px] border border-[#4D5057] bg-[#2E3137] p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/images/segmentation_female_image_1.png"
                  className="h-20 w-20 rounded-lg bg-[#FBFBFB] object-cover"
                  alt="Original"
                />
                <div className="space-y-0.5">
                  <p className="font-inter text-sm text-[#CACFDA]">landscape_photo.jpg</p>
                  <p className="font-inter text-xs text-[#B6BCCA]">Uploaded on Jan 15, 2025</p>
                </div>
              </div>

              <Button className="h-10 w-full md:w-auto rounded-lg border border-[#4D5057] bg-[#2E3137] text-white hover:bg-[#3A3D44]">
                <FaSync className="mr-2 h-4 w-4" />
                Reprocess
              </Button>
            </div>
          </div>
        </section>

        {/* Controls row */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="font-inter text-xl font-bold text-white">AI Generated Results</h3>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="h-10 w-full sm:w-auto rounded-lg bg-[#00FFFF] text-black shadow-[0px_-20px_20px_0px_#01FF013D_inset] hover:bg-[#00E6E6]">
                <Download className="mr-2 h-4 w-4" />
                Download all
              </Button>

              <Button className="h-10 w-full sm:w-auto rounded-lg border border-[#4D5057] bg-[#2E3137] text-white hover:bg-[#3A3D44]">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Results grid */}
          <div
            className="
              grid gap-5
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[
              { model: "DALL-E 3", size: "2048x2048" },
              { model: "DALL-E 3", size: "2048x2048" },
              { model: "DALL-E 3", size: "2048x2048" },
              { model: "DALL-E 3", size: "2048x2048" },
              { model: "DALL-E 3", size: "2048x2048" },
              { model: "DALL-E 3", size: "2048x2048" },
            ].map((r, i) => (
              <ResultCard
                key={i}
                model={r.model}
                size={r.size}
                img="/assets/images/segmentation_female_image_1.png"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UploadImageResult;
