import { EyeIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { ethers } from "ethers";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../utils/AuthProvider";
import { productData } from "../../../utils/sample-data";
import { timeConverter } from "../../../lib/utilities";

function Orders({ orders, ethprice }) {
  const [productData, setproductData] = useState([]);
  const { signer, address } = useContext(AuthContext);

  useEffect(() => {
    if (address) {
      const loadOrders = async () => {
        const data = await signer.fetchProductItems();
        console.log(data);
        setproductData(data);
      };
      loadOrders();
    }
  }, [signer]);

  let orders_ = orders;
  const [type, settype] = useState("");

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
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="returned">Returned</option>
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
                  type === "pending"
                    ? p.pending === true
                    : type === "returned"
                    ? p.returned === true
                    : orders_
                )
                .map((order) => {
                  const object = {
                    id: order.id.toString(),
                  };
                  const filterImage = productData.filter(
                    (p) => p.name === order.product
                  );
                  return (
                    <Link
                      href={{
                        pathname: "/dashboard/customer/order",
                        query: { object: JSON.stringify(object) }, // the data
                      }}
                    >
                      <tr>
                        <td className="p-2">
                          <div className="flex items-center">
                            <div className="text-slate-800">
                              {order.product}
                            </div>
                          </div>
                        </td>

                        <td className="p-2">
                          <div className="flex items-center">
                            <img src={filterImage[0].hash} />
                            {/* <img src={""} /> */}
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
                          <div className="text-center ">
                            {order.addressLine}
                          </div>
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

                        <td className="p-2">
                          <div className="text-center text-sky-500">
                            <EyeIcon className="h-5 text-gray-600" />
                          </div>
                        </td>
                        {order.recieved ? (
                          <td className="p-2">
                            <span className=" px-2 py-2 rounded-full text-green-700 bg-green-100">
                              Recieved
                            </span>
                          </td>
                        ) : (
                          ""
                        )}
                        {order.pending ? (
                          <td className="p-2">
                            <span className=" px-3 py-2 rounded-full text-yellow-700 bg-yellow-100">
                              Pending
                            </span>
                          </td>
                        ) : (
                          ""
                        )}
                        {order.returned ? (
                          <td className="p-2">
                            <span className=" px-3 py-2 rounded-full text-red-700 bg-red-100">
                              Returned
                            </span>
                          </td>
                        ) : (
                          ""
                        )}
                      </tr>
                    </Link>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
