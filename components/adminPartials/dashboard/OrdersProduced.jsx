import { EyeIcon } from "@heroicons/react/outline";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { productData } from "../../../utils/sample-data";
import { ethers } from "ethers";
import { timeConverter } from "../../../lib/utilities";
import { AuthContext } from "../../../utils/AuthProvider";
import Spinner from "../../spinner";

function OrdersProduced({ orders, producedOrders, ethprice, productData }) {
  const { address, signer, provider } = useContext(AuthContext);
  let orders_ = orders;
  const [type, settype] = useState("");
  // console.log(type);
  if (type == "produced") {
    orders_ = producedOrders;
  }
  const produceOrder = async (id) => {
    let validate = await signer.validateRole("manufacturer", address);
    if (validate) {
      try {
        const transaction = await signer.produceOrder(id, "manufacturer");
        console.log(id);
        await transaction.wait();
        alert("order produced succesfully");
        window.location.reload();

        console.log(id);
      } catch (err) {
        alert("You dont have permission to perform this action");
        // const code = err.data.replace("Reverted ", "");
        // console.log(err.data,);
        // let reason = ethers.utils.toUtf8String("0x" + code.substr(138));
        // console.log("revert reason:", reason);
      }
    } else {
      alert("You dont have permission to perform this action");
    }
  };

  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg w-full rounded-md border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex flex-row items-center space-x-4">
        <h2 className="font-semibold text-slate-800">All Orders</h2>

        <div className="w-max md:w-max px-3">
          <div className="relative">
            <select
              onChange={(e) => {
                settype(e.target.value);
              }}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              {/* <option type="all">All</option> */}
              <option value="pending">Pending</option>
              <option value="produced">Produced</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">IMAGE</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Order date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Quantity</div>
                </th>

                <th className="p-2">
                  <div className="font-semibold text-center">Price</div>
                </th>

                <th className="p-2">
                  <div className="font-semibold text-center">Address</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">State</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">City</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Contact</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">zipcode</div>
                </th>

                <th className="p-2"></th>
                <th className="p-2"></th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm  font-medium divide-y divide-slate-100">
              {orders_
                .filter((p) =>
                  type === "produced" ? p.produced === true : orders_
                )
                .map((order) => {
                  const object = {
                    id: order.id.toString(),
                  };
                  const filterImage = productData.filter(
                    (p) => p.name === order.product
                  );
                  return (
                    <tr>
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="text-slate-800">{order.product}</div>
                        </div>
                      </td>

                      <td className="p-2">
                        <div className="flex items-center">
                          <img src={filterImage[0].hash} />
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center ">
                          {timeConverter(order.orderdate.toString())}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {order.quantity.toString()}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-sky-500">
                          $
                          {(
                            Number(
                              ethers.utils.formatEther(order.price.toString())
                            ) * ethprice
                          ).toFixed(2)}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center ">{order.addressLine}</div>
                      </td>

                      <td className="p-2">
                        <div className="text-center ">{order.state}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center ">{order.city}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center ">{order.contact}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center ">{order.zipcode}</div>
                      </td>

                      {!order.produced ? (
                        <td
                          onClick={() => {
                            produceOrder(order.id.toString());
                          }}
                          className="p-2"
                        >
                          <span className="cursor-pointer px-2 py-2 rounded-full text-yellow-700 bg-yellow-100">
                            Produce
                          </span>
                        </td>
                      ) : (
                        ""
                      )}
                      {order.produced ? (
                        <td className="p-2">
                          <span className=" px-3 py-2 rounded-full text-green-700 bg-green-100">
                            Produced
                          </span>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrdersProduced;
