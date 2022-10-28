import { EyeIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import AdminSideNav from "../../../components/Admin/adminSideNav";
import Orders from "../../../components/Admin/Orders";
import Modal from "../../../components/Modal";
import OrderModal from "../../../components/OrderModal";

type Props = {};

const Admin = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("") as any;
  return (
    <div className="font-Montserrat  w-full">
      <div className="flex flex-row  w-full">
        <AdminSideNav />
        <div className="w-full px-4 md:px-16 mt-10 h-screen">
          <div className="flex flex-col-reverse  md:flex-row md:items-center md:justify-between">
            <div className="flex bg-gradient-to-r  from-pink-500 to-yellow-500 rounded-lg py-8 px-4 mt-5 md:mt-0 text-white   flex-row  items-center space-x-2 md:space-x-2 ">
              <img
                src="/images/profile.jpg"
                className="w-14 h-14 rounded-full"
              />
              <div>
                <p className="font-bold text-xl">0x5ffdsef..455fad</p>
                <p>User</p>
              </div>
            </div>
            <button
              onClick={() => {
                setOpen(!open);

                setComp(<OrderModal />);
              }}
              className="  bg-gradient-to-r active:outline-none active:border-none from-[#0469A1] via-[#0469A1]  to-[#0C9FF2]  text-center w-max   px-6 py-2  rounded-full cursor-pointer text-white"
            >
              Make Order
            </button>
          </div>

          {/* <Orders /> */}

          <div>
            <div className="pl-5">
              <div className="flex items-center">
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg"
                  alt="paper clip"
                />
                <p className="text-sm leading-none text-gray-600   ml-2">
                  04/21
                </p>
              </div>
            </div>
          </div>
          <div className=" w-full">
            <div className=" py-4 md:py-7">
              <div className="flex items-center justify-between">
                <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-500 ">
                  Orders
                </p>
              </div>
            </div>
            <div className="bg-white shadow-lg ring-[1px] rounded-md ring-gray-200 py-4 md:py-7 px-4 md:px-8 xl:px-10">
              <div className="sm:flex items-center justify-between">
                <div className="flex items-center overflow-scroll md:overflow-x-hidden">
                  <a
                    className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                    href=" javascript:void(0)"
                  >
                    <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                      <p>All</p>
                    </div>
                  </a>
                  <a
                    className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                    href="javascript:void(0)"
                  >
                    <div className="py-2 px-8 text-gray-600   hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                      <p>Recieved</p>
                    </div>
                  </a>
                  <a
                    className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                    href="javascript:void(0)"
                  >
                    <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                      <p>Pending</p>
                    </div>
                  </a>
                  <a
                    className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                    href="javascript:void(0)"
                  >
                    <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                      <p>Returned</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="mt-7 overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    <tr className="focus:outline-none   h-16 border border-gray-200 rounded-lg">
                      <td className="">
                        <div className="flex items-center pl-5">
                          <p className="text-base font-medium leading-none text-gray-700   mr-2">
                            Milo
                          </p>
                        </div>
                      </td>
                      <td className="pl-24">
                        <div className="flex items-center">
                          <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg2.svg"
                            alt="tag"
                          />
                          <p className="text-sm leading-none text-gray-600   ml-2">
                            Beverage
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg3.svg"
                            alt="list"
                          />
                          <p className="text-sm leading-none text-gray-600   ml-2">
                            04/07
                          </p>
                        </div>
                      </td>

                      <td className="pl-5">
                        <div className="flex items-center">
                          <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg"
                            alt="paper clip"
                          />
                          <p className="text-sm leading-none text-gray-600   ml-2">
                            04/21
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <EyeIcon className="h-5 text-gray-600" />
                          <p className="text-sm leading-none text-gray-600   ml-2">
                            View
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <button className="py-3 px-3 text-sm focus:outline-none leading-none text-green-700 bg-green-100 rounded-full">
                          Received
                        </button>
                      </td>
                    </tr>
                    <tr className="h-3"></tr>

                    <tr className="focus:outline-none  h-16 border border-gray-200 rounded-lg">
                      <td className="">
                        <div className="flex items-center pl-5">
                          <p className="text-base font-medium leading-none text-gray-700   mr-2">
                            Marketing Keynote Presentation
                          </p>
                        </div>
                      </td>
                      <td className="pl-24">
                        <div className="flex items-center">
                          <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg2.svg"
                            alt="tag"
                          />
                          <p className="text-sm leading-none text-gray-600   ml-2">
                            Urgent
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg3.svg"
                            alt="list"
                          />
                          <p className="text-sm leading-none text-gray-600   ml-2">
                            04/07
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg4.svg"
                            alt="chat"
                          />
                          <p className="text-sm leading-none text-gray-600   ml-2">
                            23
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg5.svg"
                            alt="paper clip"
                          />
                          <p className="text-sm leading-none text-gray-600   ml-2">
                            04/07
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <button className="py-3 px-3 text-sm focus:outline-none leading-none text-green-700 bg-green-100 rounded-full">
                          Received
                        </button>
                      </td>

                      <td>
                        <div className="relative px-5 pt-2">
                          <button
                            className="focus:ring-2 rounded-md focus:outline-none"
                            role="button"
                            aria-label="option"
                          >
                            <img
                              className="dropbtn"
                              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/tasks-svg6.svg"
                              alt="dropdown"
                            />
                          </button>
                          <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                            <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Edit</p>
                            </div>
                            <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Delete</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="h-3"></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        {comp}
      </Modal>
    </div>
  );
};

export default Admin;
