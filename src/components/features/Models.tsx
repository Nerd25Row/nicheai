import { Check } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

type FeatureProps = { children: React.ReactNode };
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
  rightBg?: string;
  rightImgSrc?: string;
  vectorSrc?: string;
  leftAlt?: string;
  rightAlt?: string;
};
const MediaPair: React.FC<MediaPairProps> = ({
  leftImgSrc,
  rightBg = "bg-[#0B0F18]",
  rightImgSrc,
  vectorSrc = "/assets/images/vector.svg",
  leftAlt = "input example",
  rightAlt = "output example",
}) => (
  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Left */}
    <div className="flex items-center rounded-lg bg-[#FBFBFB]">
      <img
        src={leftImgSrc}
        alt={leftAlt}
        className="h-52 md:h-56 w-auto object-cover"
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
      className={`flex items-end justify-center rounded-lg bg-cover bg-no-repeat bg-center ${rightBg}`}
      style={{ minHeight: "13.5rem" }} // ~216px
    >
      {rightImgSrc ? (
        <img
          src={rightImgSrc}
          alt={rightAlt}
          className="h-52 md:h-56 w-auto object-cover"
        />
      ) : null}
    </div>
  </div>
);

type ModelBlockProps = {
  title: string;
  description: string;
  features: string[];
  leftImg: string;
  rightBg?: string;
  rightImg?: string;
  navigate: any;
};
const ModelBlock: React.FC<ModelBlockProps> = ({
  title,
  description,
  features,
  leftImg,
  rightBg,
  rightImg,
  navigate,
}) => (
  <section className="w-full max-w-[1120px]">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Media side */}
      <div className="flex flex-col gap-4">
        <MediaPair
          leftImgSrc={leftImg}
          rightBg={rightBg}
          rightImgSrc={rightImg}
        />
        {/* Thumbnails row (auto-wrap on small screens) */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <img
            src="/assets/images/segmentation_male_image_1.svg"
            className="h-[106px] w-[125px] "
            alt="thumb 1"
          />
          <img
            src="/assets/images/segmentation_male_image_2.svg"
            className="h-[106px] w-[125px] "
            alt="thumb 2"
          />
          <img
            src="/assets/images/segmentation_male_image_1.svg"
            className="h-[106px] w-[125px]"
            alt="thumb 3"
          />
          <img
            src="/assets/images/segmentation_male_image_2.svg"
            className="h-[106px] w-[125px] "
            alt="thumb 4"
          />
        </div>
      </div>

      {/* Text side */}
      <div className="flex flex-col justify-between gap-6">
        <div className="space-y-3">
          <h3 className="font-inter text-2xl font-bold text-white">{title}</h3>
          <p className="font-inter text-base text-[#CACFDA] leading-snug">
            {description}
          </p>
        </div>

        <ul className="space-y-3">
          {features.map((f) => (
            <Feature key={f}>{f}</Feature>
          ))}
        </ul>

        <div>
          <Button
            className="w-full sm:w-auto rounded-lg bg-[#00FFFF] text-[#1D2027] font-inter font-bold shadow-[0px_-20px_20px_0px_#01FF013D_inset] h-12 px-6"
            onClick={() => {
              navigate("upload-image");
            }}
          >
            Select Model
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const Models: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#1E2128] p-4 md:p-6 gap-10 md:gap-20">
      {/* Segmentation */}
      <ModelBlock
        title="Segmentation"
        description="Advanced image segmentation using state-of-the-art deep learning models. Automatically identify and separate different objects, regions, or features within your images with pixel-perfect precision."
        features={[
          "Real-time object detection",
          "Multiple segmentation modes",
          "High accuracy results",
        ]}
        leftImg="/assets/images/segmentation_female_image_1.png"
        rightBg="bg-[url('/assets/images/segmentation.svg')]"
        rightImg="/assets/images/segmentation_generated.png"
        navigate={navigate}
      />

      {/* Fusion */}
      <ModelBlock
        title="Fusion"
        description="Intelligent image fusion technology that combines multiple images or layers to create enhanced composite results. Perfect for HDR processing, multi-exposure blending, and creative compositions."
        features={[
          "Multi-layer blending",
          "HDR tone mapping",
          "Seamless integration",
        ]}
        leftImg="/assets/images/segmentation_female_image_1.png"
        rightBg="bg-[#111825]"
        rightImg="/assets/images/segmentation_generated.png"
        navigate={navigate}
      />

      {/* Immersion */}
      <ModelBlock
        title="Immersion"
        description="Transform 2D images into immersive 3D experiences using advanced depth estimation and spatial reconstruction. Create engaging visual content for VR, AR, and interactive applications."
        features={[
          "Depth map generation",
          "3D reconstruction",
          "VR/AR compatibility",
        ]}
        leftImg="/assets/images/segmentation_female_image_1.png"
        rightBg="bg-[url('/assets/images/segmentation.svg')]"
        rightImg="/assets/images/segmentation_generated.png"
        navigate={navigate}
      />
    </div>
  );
};

export default Models;
