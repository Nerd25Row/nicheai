import { useState, type FC } from "react";
import BillingAndSubscription from "./BillingAndSubscription";
import CompanyInformation from "./CompanyInformation";
import TeamManagement from "./TeamManagement";
import UpgradeDialog from "./UpgradeDialog";

const CompanySettings: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center w-full min-h-[1029px] rotate-0 opacity-100 gap-8  rounded-[20px] p-8">
      <CompanyInformation />
      <TeamManagement />
      <BillingAndSubscription setOpen={setOpen} />
      <UpgradeDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default CompanySettings;

