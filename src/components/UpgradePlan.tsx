import AvailablePlans from "./AvailablePlans";
import PlanStats from "./PlanStats";
import CallToActionButton from "./CallToActionButton";

const UpgradePlan = () => {
  return (
    <div className="flex flex-col w-full flex-1 min-h-screen items-center py-4 md:py-10 px-4 md:px-0">
      <div className="flex flex-col items-center w-full lg:max-w-[1120px] min-h-[814px] gap-8 lg:gap-12  rounded-lg p-4 lg:p-8">
        {/* plan stats */}
        <PlanStats />
        {/* Plans */}
        <AvailablePlans />
        <CallToActionButton />
      </div>
    </div>
  );
};

export default UpgradePlan;
