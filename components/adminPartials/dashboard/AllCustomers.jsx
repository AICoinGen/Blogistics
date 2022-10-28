import { EyeIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { productData } from "../../../utils/sample-data";
import { timeConverter } from "../../../lib/utilities";

function AllCustomers({ customer }) {
  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg w-full rounded-md border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex flex-row items-center space-x-4">
        <h2 className="font-semibold text-slate-800">All Customers</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Address</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm  font-medium divide-y divide-slate-100">
              {customer.map((customer) => {
                return (
                  <tr>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-slate-800">{customer.owner}</div>
                      </div>
                    </td>
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

export default AllCustomers;
