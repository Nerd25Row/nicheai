// DashboardHeaderInfo.tsx
const DashboardHeaderInfo = () => {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <h1 className="font-inter font-bold text-xl lg:text-2xl leading-tight tracking-[-0.01em] text-black dark:text-white truncate">
        AI Image Processing Dashboard
      </h1>
      <p className="hidden lg:block font-inter text-sm lg:text-base leading-snug text-gray-600 dark:text-[#B6BCCA] truncate">
        Upload and process your images with advanced AI models
      </p>
    </div>
  );
};

export default DashboardHeaderInfo;
