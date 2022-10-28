import React, { useState, useContext, useEffect } from "react";
import {
  AdjustmentsIcon,
  CheckCircleIcon,
  CheckIcon,
  ClipboardListIcon,
  RefreshIcon,
  SparklesIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import Modal from "../Modal";
import ReviewModal from "../ReviewModal";
import { timeConverter } from "../../lib/utilities";
import { productData } from "../../utils/sample-data";
import { AuthContext } from "../../utils/AuthProvider";

function Orders({ order }) {
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("") as any;
  const { address, signer } = useContext(AuthContext);
  const [productData, setproductData] = useState([]);

  useEffect(() => {
    if (address) {
      const loadOrders = async () => {
        const data_ = await signer.fetchProductItems();
        setproductData(data_);
      };
      loadOrders();
    }
  }, [signer]);
  const receiveOrder = async (id) => {
    // console.log("called");
    try {
      const transaction = await signer.receiveOrder(id);

      await transaction.wait();
      alert("order recieved succesfully");
    } catch (err) {
      alert("You dont have permission to perform this action");
    }
  };

  const returnOrder = async (id) => {
    console.log("called");
    try {
      const transaction = await signer.returnOrder(id);
      await transaction.wait();
      alert("order returned succesfully");
    } catch (err) {
      // console.log(err);
      alert("You dont have permission to perform this action");
    }
  };

  type orderType = {
    id?: string;
    product?: string;
    orderdate?: any;
    confirmed?: boolean;
    confirmdate?: any;
    produced?: any;
    producedate?: any;
    tested?: any;
    testdate?: any;
    transported?: any;
    transportdate?: any;
  };
  // console.log(order);

  return (
    <div className=" col-span-full xl:col-span-12 bg-white shadow-lg w-full rounded-md border border-slate-200 p-3">
      <div className="w-full">
        {order.map((order: orderType) => {
          const filterImage = productData.filter(
            (p) => p.name === order.product
          );
          return (
            <>
              <img src={filterImage[0].hash} />
              <div className="py-4 flex md:flex-row flex-col  text-gray-600 md:items-center md:space-x-2 space-y-2 md:space-y-0">
                <p className="text-xl font-medium">{order.product} </p>
                <div
                  onClick={() => {
                    receiveOrder(order.id.toString());
                  }}
                  className="cursor-pointer font-medium text-sm bg-green-500 w-max text-white rounded-full text-center  hover:text-gray-200 flex justify-center  items-center py-1 px-3"
                >
                  Recieve order
                </div>
                <div
                  onClick={() => {
                    returnOrder(order.id.toString());
                  }}
                  className="cursor-pointer font-medium text-sm bg-red-500 w-max text-white rounded-full text-center  hover:text-gray-200 flex justify-center  items-center py-1 px-3"
                >
                  Return order
                </div>
                <div
                  onClick={() => {
                    setOpen(!open);
                    setComp(<ReviewModal id={order.id.toString()} />);
                  }}
                  className="cursor-pointer font-medium text-sm bg-blue-500 w-max text-white rounded-full text-center  hover:text-gray-200 flex justify-center  items-center py-1 px-3"
                >
                  Review
                </div>
                {/* <XCircleIcon className="w-8" /> */}
              </div>
              <ol className="items-center sm:flex">
                <li className="relative mb-6  sm:mb-0">
                  <div className="flex items-center">
                    <div
                      className={`flex z-10 justify-center items-center w-max h-max p-2 ${
                        order.orderdate.toString() > 1
                          ? "bg-green-400"
                          : "bg-gray-400"
                      } rounded-full ring-0 ring-white`}
                    >
                      <ClipboardListIcon className="h-8 text-white" />
                    </div>
                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
                  </div>
                  <div className="mt-3 group sm:pr-8">
                    <div className="flex  flex-row items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900 ">
                        Order
                      </h3>
                      {order.orderdate.toString() > 1 ? (
                        <CheckCircleIcon className="h-6" />
                      ) : (
                        <RefreshIcon className="h-6" />
                      )}
                    </div>
                    <p className="block mb-2  text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      Order made on {timeConverter(order.orderdate.toString())}
                    </p>
                  </div>
                </li>
                <li className="relative mb-6  sm:mb-0">
                  <div className="flex items-center">
                    <div
                      className={`flex z-10 justify-center items-center w-max h-max p-2 ${
                        order.confirmed ? "bg-green-400" : "bg-gray-400"
                      } rounded-full ring-0 ring-white`}
                    >
                      <CheckCircleIcon className="h-8 text-white" />
                    </div>
                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
                  </div>
                  <div className="mt-3 group sm:pr-8">
                    <div className="flex  flex-row items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900 ">
                        Approved
                      </h3>
                      {order.confirmed ? (
                        <CheckCircleIcon className="h-6" />
                      ) : (
                        <RefreshIcon className="h-6" />
                      )}
                    </div>
                    <p className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {order.confirmed
                        ? `Order confirmed on ${timeConverter(
                            order.confirmdate.toString()
                          )}`
                        : "This order has not been Approved yet "}
                    </p>
                  </div>
                </li>
                <li className="relative mb-6  sm:mb-0">
                  <div className="flex items-center">
                    <div
                      className={`flex z-10 justify-center items-center w-max h-max p-2 ${
                        order.produced ? "bg-green-400" : "bg-gray-400"
                      } rounded-full ring-0 ring-white`}
                    >
                      <SparklesIcon className="h-8 text-white" />
                    </div>
                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
                  </div>
                  <div className="mt-3 group sm:pr-8">
                    <div className="flex  flex-row items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900 ">
                        Production
                      </h3>
                      {order.produced ? (
                        <CheckCircleIcon className="h-6" />
                      ) : (
                        <RefreshIcon className="h-6" />
                      )}
                    </div>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {order.produced
                        ? `Order produced on ${timeConverter(
                            order.producedate.toString()
                          )}`
                        : "This order has not been Produced yet "}
                    </time>
                  </div>
                </li>
                <li className="relative mb-6  sm:mb-0">
                  <div className="flex items-center">
                    <div
                      className={`flex z-10 justify-center items-center w-max h-max p-2 ${
                        order.tested ? "bg-green-400" : "bg-gray-400"
                      } rounded-full ring-0 ring-white`}
                    >
                      <AdjustmentsIcon className="h-8 text-white" />
                    </div>
                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
                  </div>
                  <div className="mt-3 group sm:pr-8">
                    <div className="flex  flex-row items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900 ">
                        Testing
                      </h3>
                      {order.tested ? (
                        <CheckCircleIcon className="h-6" />
                      ) : (
                        <RefreshIcon className="h-6" />
                      )}
                    </div>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {order.tested
                        ? `Order tested on ${timeConverter(
                            order.testdate.toString()
                          )}`
                        : "This order has not been Tested yet "}
                    </time>
                  </div>
                </li>
                <li className="relative mb-6  sm:mb-0">
                  <div className="flex items-center">
                    <div
                      className={`flex z-10 justify-center items-center w-max h-max p-2 ${
                        order.transported ? "bg-green-400" : "bg-gray-400"
                      } rounded-full ring-0 ring-white`}
                    >
                      <TruckIcon className="h-8 text-white" />
                    </div>
                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
                  </div>
                  <div className="mt-3 group sm:pr-8">
                    <div className="flex  flex-row items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900 ">
                        Shipping
                      </h3>
                      {order.transported ? (
                        <CheckCircleIcon className="h-6" />
                      ) : (
                        <RefreshIcon className="h-6" />
                      )}
                    </div>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {order.transported
                        ? `Order shipped on ${timeConverter(
                            order.transportdate.toString()
                          )}`
                        : "This order has not been Shipped yet "}
                    </time>
                  </div>
                </li>
              </ol>
            </>
          );
        })}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        {comp}
      </Modal>
    </div>
  );
}

export default Orders;
