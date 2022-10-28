import React from "react";
import { ClipboardListIcon, TrashIcon } from "@heroicons/react/outline";
type Props = {};


const AdminSideNav = (props: Props) => {
  return (
    <div className="bg-gradient-to-b hidden  space-y-10 md:flex p-1 flex-col text-center items-center from-[#0469A1] via-[#0469A1]  to-[#0C9FF2]  ">
      <img src={"/images/logo_2.svg"} className="w-28 mt-6" />
      <div className="bg-[#ffffff81] p-1 md:p-4 rounded-lg">
        <ClipboardListIcon className="h-10 text-white" />
      </div>
      <div className="">
        <TrashIcon className="h-8 text-white" />
      </div>
    </div>
  );
};

export default AdminSideNav;
