import { Plus, MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import InviteTeamMembers from "./InviteTeamMembers";
import { useState } from "react";
import { useCreateInviteLinkMutation } from "../features/companyTeamMember/useCreateInviteLinkMutation";

const TeamManagement = () => {
  const [open, setOpen] = useState<boolean>(false);
  const createInviteLinkMutation = useCreateInviteLinkMutation();

  const handleInviteTeamMembers = async () => {
    try {
      await createInviteLinkMutation.mutateAsync();
      setOpen(true);
    } catch (error) {}
  };
  return (
    <div className="w-full md:max-w-[864px] md:min-h-[288px] rounded-[20px] border border-[#4D5057] bg-[#2E3137] p-4">
      <div className="w-full md:max-w-[814px] md:min-h-[40px] flex flex-col items-center md:flex-row justify-between mb-4">
        <div className="w-full md:max-w-[165.05px] md:min-h-[28px]">
          <span className="font-inter font-medium text-lg text-white">
            Team Management
          </span>
        </div>

        <Button
          className="flex items-center w-full md:max-w-[224px] md:min-h-[40px] gap-2 rounded-[8px] border border-[#4D5057] bg-[#2E3137] px-4 py-2 shadow-[0px_1px_2px_0px_#1018280D]"
          onClick={handleInviteTeamMembers}
        >
          <Plus className="w-full md:max-w-[16px] h-[16px] text-white" />
          <span className="w-full hidden md:flex md:max-w-[168px] md:min-h-[24px] font-inter font-bold text-base text-white">
            Invite Team Members
          </span>
        </Button>
      </div>

      {/* Table */}
      <div className="w-full md:max-w-[814px] md:min-h-[174px]">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-[#4D5057]">
              <TableHead className="px-3 py-3">
                <span className="font-inter font-medium text-sm text-[#B6BCCA]">
                  Name
                </span>
              </TableHead>
              <TableHead className="px-3 py-3">
                <span className="font-inter font-medium text-sm text-[#B6BCCA]">
                  Role
                </span>
              </TableHead>
              <TableHead className="px-3 py-3">
                <span className="font-inter font-medium text-sm text-[#B6BCCA]">
                  Status
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="border-b border-[#4D5057]">
              <TableCell className="flex items-center gap-3 px-3 py-4 text-white">
                <img
                  src="/assets/images/team_member_1.jpg"
                  className="w-8 h-8 rounded-full border border-[#E5E7EB]"
                  alt="member"
                />
                <div>
                  <span className="font-inter text-base text-white">
                    John Smith
                  </span>
                </div>
              </TableCell>
              <TableCell className="w-[191.5px] h-[32px] rotate-0 opacity-100 text-white">
                <Select>
                  <SelectTrigger className="w-[102px] h-[29px] rotate-0 opacity-100 pr-[6px] pl-[12px] rounded-md bg-[#4D5057] flex justify-between items-center">
                    <SelectValue
                      placeholder="Admin"
                      className="w-[42px] h-[29px] rotate-0 opacity-100 font-inter font-normal text-sm leading-[100%] tracking-[0%] align-middle text-white"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Admin</SelectItem>
                    <SelectItem value="dark">Member</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="w-[191.5px] h-[32px] rotate-0 opacity-100  text-white">
                <div className="w-[51.484375px] h-[23px] rotate-0 opacity-100 relative  rounded-full bg-[#3DD59833]">
                  <span className="w-[41px] h-[16px] rotate-0 opacity-100 absolute top-[4px] left-[8px] font-inter font-normal text-xs leading-[100%] tracking-[0%] text-[#3DD598]">
                    Active
                  </span>
                </div>
              </TableCell>
              <TableCell className="w-[32px] h-[32px] rotate-0 opacity-100  text-white relative">
                <div className="w-[4px] h-[16px] rotate-0 opacity-100 relative">
                  {/* NEXT TO DO */}
                  <MoreVertical className=" rotate-0 opacity-100  text-[#B6BCCA]" />
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="border-b border-[#4D5057]">
              <TableCell className="flex items-center gap-3 px-3 py-4 text-white">
                <img
                  src="/assets/images/team_member_2.jpg"
                  className="w-8 h-8 rounded-full border border-[#E5E7EB]"
                  alt="member"
                />
                <div>
                  <span className="font-inter text-base text-white">
                    Sarah Johnson
                  </span>
                </div>
              </TableCell>
              <TableCell className="w-[191.5px] h-[32px] rotate-0 opacity-100 text-white">
                <Select>
                  <SelectTrigger className="w-[102px] h-[29px] rotate-0 opacity-100 pr-[6px] pl-[12px] rounded-md bg-[#4D5057] flex justify-between items-center">
                    <SelectValue
                      placeholder="Admin"
                      className="w-[42px] h-[29px] rotate-0 opacity-100 font-inter font-normal text-sm leading-[100%] tracking-[0%] align-middle text-white"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Admin</SelectItem>
                    <SelectItem value="dark">Member</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="w-[191.5px] h-[32px] rotate-0 opacity-100  text-white">
                <div className="w-[62.39px] h-[23px] rotate-0 opacity-100 relative  rounded-full bg-[#FFC54233]">
                  <span className="w-[41px] h-[16px] rotate-0 opacity-100 absolute top-[4px] left-[8px] font-inter font-normal text-xs leading-[100%] tracking-[0%] text-[#FFC542]">
                    Pending
                  </span>
                </div>
              </TableCell>
              <TableCell className="w-[32px] h-[32px] rotate-0 opacity-100  text-white relative">
                <div className="w-[4px] h-[16px] rotate-0 opacity-100 relative">
                  {/* NEXT TO DO */}
                  <MoreVertical className=" rotate-0 opacity-100  text-[#B6BCCA]" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <InviteTeamMembers open={open} setOpen={setOpen} />
    </div>
  );
};

export default TeamManagement;
