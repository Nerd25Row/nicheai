import React from "react";

const ProcessingImage: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-[377px] h-[162px] rotate-0 opacity-100 top-[463px] left-[659.5px] gap-[38px] flex items-center justify-center">
      <div
        className="
        relative w-24 h-24
        rounded-full animate-spin
        bg-[conic-gradient(#00ffff_0_70%,#00ff66_70%_85%,transparent_85%_100%)]
        [mask:radial-gradient(farthest-side,transparent_calc(100%-12px),#000_calc(100%-12px))]
        before:content-[''] before:absolute before:inset-0 before:rounded-full
        before:bg-white/10
        before:[mask:radial-gradient(farthest-side,transparent_calc(100%-12px),#000_calc(100%-12px))]
        "
        aria-label="Loading"
        role="img"
      />
      {/* NEXT TO DO */}
       <span className="w-[512px] h-[28px] opacity-100 font-inter font-medium text-lg leading-[28px] tracking-[0%] text-center text-[#B6BCCA]">
         Working magic on your image...
       </span>
    </div>
  );
};

export default ProcessingImage;
