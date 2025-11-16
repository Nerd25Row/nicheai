import { useNavigate } from "react-router-dom";
import { useGetAllModelsQuery } from "../features/model/useGetAllModelsQuery";
import type { Model } from "../services/model/modelService";

const Card: React.FC<
  React.PropsWithChildren<{ className?: string; onClick?: () => void }>
> = ({ className = "", onClick, children }) => (
  <div
    className={`rounded-[20px] cursor-pointer border border-[#4D5057] bg-gray-200 dark:bg-[#2E3137] transition-all duration-300 ease-out
      hover:scale-[1.03] 
      hover:shadow-[0px_8px_25px_rgba(0,0,0,0.25)]
      dark:hover:shadow-[0px_8px_25px_rgba(0,0,0,0.55)] ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);
const TestModels = () => {
  const { data: models, isLoading, error } = useGetAllModelsQuery();
  const navigate = useNavigate();
  const handleSelectModel = (model: Model) => {
    navigate(
      `/models/upload-image?modelSlug=${encodeURIComponent(
        model.slug
      )}&modelId=${model.id}&modelName=${encodeURIComponent(
        model.name
      )}&modelDescription=${encodeURIComponent(model.description)}`
    );
  };
  const modelsInfos = [
    {
      bgImage: "/assets/images/segmentation.svg",
      modelName: "segmentation",
      thumbNail: "/assets/images/segmentation_generated.png",
      shortDesc: "Advanced object segmentation and background removal",
    },
    {
      bgImage: "",
      modelName: "fusion",
      thumbNail: "/assets/images/fusion.png",
      shortDesc: "Intelligent image fusion and composition tools",
    },
    {
      bgImage: "/assets/images/immersion.png",
      modelName: "immersion",
      thumbNail: "",
      shortDesc: "Create immersive visual experiences with AI",
    },
  ];
  return (
    <div className="w-full max-w-[1120px]">
      <span className="font-inter font-bold text-2xl dark:text-white">
        Test our models
      </span>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models?.map((model: Model) => {
          const currentModel = modelsInfos.find(
            (m) => m.modelName === model.name.toLocaleLowerCase()
          );
          return (
            <Card
              className="p-5 flex flex-col gap-4 "
              key={model.name}
              onClick={() => handleSelectModel(model)}
            >
              <div
                className={`relative h-40 sm:h-48 rounded-[8px] ${
                  currentModel?.modelName === "fusion" ? "bg-[#111825]" : ""
                } bg-cover bg-no-repeat bg-center  flex items-end justify-center`}
                style={
                  currentModel?.bgImage
                    ? { backgroundImage: `url(${currentModel.bgImage})` }
                    : undefined
                }
              >
                {currentModel?.thumbNail && (
                  <img
                    src={currentModel?.thumbNail}
                    className="w-40 h-40 object-cover"
                    alt="Segmentation preview"
                  />
                )}
              </div>
              <div>
                <span className="font-inter font-semibold dark:text-white text-xl">
                  {model.name}
                </span>
              </div>
              <div>
                <span className="font-inter text-sm text-gray-600 dark:text-[#B0B3B8]">
                  {currentModel?.shortDesc}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TestModels;
