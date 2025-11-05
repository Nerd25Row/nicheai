import { Check, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllModelsQuery } from "../features/model/useGetAllModelsQuery";
import type { Model } from "../services/model/modelService";
import { Alert, AlertDescription } from "./ui/alert";
import { cn } from "../lib/utils";

type FeatureProps = { children: React.ReactNode };

type ModelMedia = {
  leftImgSrc: string;
  leftBg?: string;
  rightBg?: string;
  rightImgSrc?: string;
  thumbnails: string[];
  leftAlt?: string;
  rightAlt?: string;
};

type MetadataMedia = Partial<
  Pick<
    ModelMedia,
    | "leftImgSrc"
    | "leftBg"
    | "rightBg"
    | "rightImgSrc"
    | "thumbnails"
    | "leftAlt"
    | "rightAlt"
  >
>;

const CATEGORY_DEFAULTS: Record<string, ModelMedia> = {
  Segmentation: {
    leftImgSrc: "/assets/images/segmentation_female_image_1.png",
    leftBg: "bg-[#E5E7EB]",
    rightBg: "bg-[url('/assets/images/segmentation.svg')]",
    rightImgSrc: "/assets/images/segmentation_generated.png",
    thumbnails: [
      "/assets/images/segmentation_male_image_1.svg",
      "/assets/images/segmentation_male_image_2.svg",
      "/assets/images/segmentation_male_image_1.svg",
      "/assets/images/segmentation_male_image_2.svg",
    ],
    leftAlt: "Segmentation input example",
    rightAlt: "Segmentation output example",
  },
  Fusion: {
    leftImgSrc: "/assets/images/fusion.png",
    leftBg: "bg-[#111825]",
    rightBg: "bg-[#111825]",
    rightImgSrc: "/assets/images/fusion.png",
    thumbnails: [
      "/assets/images/fusion.png",
      "/assets/images/fusion.png",
      "/assets/images/fusion.png",
      "/assets/images/fusion.png",
    ],
    leftAlt: "Classification input example",
    rightAlt: "Classification output example",
  },
  Immersion: {
    leftImgSrc: "/assets/images/immersion.png",
    rightImgSrc: "/assets/images/immersion.png",
    thumbnails: [
      "/assets/images/immersion.png",
      "/assets/images/immersion.png",
      "/assets/images/immersion.png",
      "/assets/images/immersion.png",
    ],
    leftAlt: "Detection input example",
    rightAlt: "Detection output example",
  },
};

// Per-slug overrides if you want a specific model to have bespoke media
const SLUG_OVERRIDES: Record<string, Partial<ModelMedia>> = {
  // "unet-seg-v2": { leftImgSrc: "/assets/images/unet_left.png", rightImgSrc: "/assets/images/unet_right.png" },
};

function arrayOrFallback(arr: unknown, fallback: string[]) {
  return Array.isArray(arr) && arr.length > 0 ? arr.slice(0, 4) : fallback;
}

function getModelMedia(model: Model): ModelMedia {
  const base = CATEGORY_DEFAULTS[model.name];

  // read from metadata if your API sends these
  const m = (model.metadata ?? {}) as { thumbnails?: string[] } & MetadataMedia;

  const fromMetadata: Partial<ModelMedia> = {
    leftImgSrc: m.leftImgSrc,
    rightBg: m.rightBg,
    rightImgSrc: m.rightImgSrc,
    thumbnails: m.thumbnails,
    leftAlt: m.leftAlt,
    rightAlt: m.rightAlt,
  };

  const slugOverride = SLUG_OVERRIDES[model.slug] ?? {};

  const merged: ModelMedia = {
    leftImgSrc:
      fromMetadata.leftImgSrc ?? slugOverride.leftImgSrc ?? base.leftImgSrc,
    rightBg: fromMetadata.rightBg ?? slugOverride.rightBg ?? base.rightBg,
    rightImgSrc:
      fromMetadata.rightImgSrc ?? slugOverride.rightImgSrc ?? base.rightImgSrc,
    thumbnails: arrayOrFallback(
      fromMetadata.thumbnails ?? slugOverride.thumbnails,
      base.thumbnails
    ),
    leftAlt: fromMetadata.leftAlt ?? slugOverride.leftAlt ?? base.leftAlt,
    rightAlt: fromMetadata.rightAlt ?? slugOverride.rightAlt ?? base.rightAlt,
  };

  return merged;
}

/** ---------- UI pieces ---------- */
const Feature: React.FC<FeatureProps> = ({ children }) => (
  <li className="flex items-start gap-2">
    <Check className="mt-1 h-4 w-4 shrink-0 text-[#00C0C1]" />
    <span className="font-inter text-base text-[#CACFDA] leading-tight">
      {children}
    </span>
  </li>
);

type MediaPairProps = {
  leftImgSrc: string;
  leftBg?: string;
  rightBg?: string;
  rightImgSrc?: string;
  vectorSrc?: string;
  leftAlt?: string;
  rightAlt?: string;
};
const MediaPair: React.FC<MediaPairProps> = ({
  leftImgSrc,
  leftBg,
  rightBg,
  rightImgSrc,
  vectorSrc = "/assets/images/vector.svg",
  leftAlt = "input example",
  rightAlt = "output example",
}) => (
  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Left */}
    <div
      className={`flex items justify-center rounded-lg bg-cover bg-no-repeat bg-center ${
        leftBg?? ""
      }`}
      style={{ backgroundColor: "#FBFBFB" }}
      
    >
      <img
        src={leftImgSrc}
        alt={leftAlt}
        className="h-52 md:h-56 w-full object-cover"
      />
    </div>

    {/* Vector arrow between (md+) */}
    <img
      src={vectorSrc}
      alt=""
      className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-16 w-24 opacity-90"
    />

    {/* Right */}
    <div
      className={`flex items-end justify-center rounded-lg bg-cover bg-no-repeat bg-center ${
        rightBg ?? ""
      }`}
    >
      <img
        src={rightImgSrc}
        alt={rightAlt}
        className="h-52 md:h-56 w-full object-cover"
      />
    </div>
  </div>
);

type ModelCardProps = {
  model: Model;
  navigate: ReturnType<typeof useNavigate>;
};
const ModelCard: React.FC<ModelCardProps> = ({ model, navigate }) => {
  const media = getModelMedia(model);
  const features = model.features ?? [];

  const handleSelectModel = () => {
    navigate(
      `/models/upload-image?modelSlug=${encodeURIComponent(
        model.slug
      )}&modelId=${model.id}&modelName=${encodeURIComponent(
        model.name
      )}&modelDescription=${encodeURIComponent(model.description)}`
    );
  };

  return (
    <section className="w-full max-w-[1120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Media side */}
        <div className="flex flex-col gap-4">
          <MediaPair
            leftImgSrc={media.leftImgSrc}
            leftBg={media.leftBg}
            rightBg={media.rightBg}
            rightImgSrc={media.rightImgSrc}
            leftAlt={media.leftAlt ?? `${model.name} input example`}
            rightAlt={media.rightAlt ?? `${model.name} output example`}
          />

          {/* Thumbnails (auto-wrap) */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {media.thumbnails.slice(0, 4).map((thumb, i) => (
              <img
                key={i}
                src={thumb}
                className="h-[106px] w-[125px] object-cover rounded"
                alt={`${model.name} thumbnail ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <h3 className="font-inter text-2xl font-bold text-white">
              {model.name}
            </h3>
            <p className="font-inter text-base text-[#CACFDA] leading-snug">
              {model.description || "No description available."}
            </p>
          </div>

          {features.length > 0 && (
            <ul className="space-y-3">
              {features.map((f, i) => (
                <Feature key={i}>{f}</Feature>
              ))}
            </ul>
          )}

          <div>
            <Button
              className="w-full sm:w-auto rounded-lg bg-[#00FFFF] text-[#1D2027] font-inter font-bold shadow-[0px_-20px_20px_0px_#01FF013D_inset] h-12 px-6"
              onClick={handleSelectModel}
            >
              Select Model
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Models: React.FC = () => {
  const { data: models, isLoading, error } = useGetAllModelsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#1E2128] p-4 md:p-6">
        <Loader2 className="h-8 w-8 animate-spin text-[#00FFFF]" />
        <p className="mt-4 font-inter text-base text-[#CACFDA]">
          Loading models...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#1E2128] p-4 md:p-6">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Failed to load models. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!models || models.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#1E2128] p-4 md:p-6">
        <Alert className="max-w-md">
          <AlertDescription>
            No models available at the moment.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#1E2128] p-4 md:p-6 gap-10 md:gap-20">
      {Object.entries(models).map(([index, model]) => (
        <div key={index} className="w-full flex flex-col gap-10 md:gap-20">
          <ModelCard key={model.id} model={model} navigate={navigate} />
        </div>
      ))}
    </div>
  );
};

export default Models;
