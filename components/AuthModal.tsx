import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";

const AuthModal = (props) => {
  const { connect, address, signer } = useContext(AuthContext);
  const [role, setrole] = useState("customer");

  // let verify = await signer.validateRole(role, address);
  return (
    <>
      <div className="relative">
        <select
          required
          onChange={(e) => {
            setrole(e.target.value);
          }}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-state"
        >
          <option>User Type</option>
          <option value="customer">Customer</option>
          <option value="adminstrator">Admininstrator</option>
          <option value="manager">Manager</option>
          <option value="manufacturer">Manufacturer</option>
          <option value="tester">Tester</option>
          <option value="transporter">Tranporter</option>
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
      <div className="flex flex-wrap -mx-3 mb-6 mt-4">
        <div className="w-full  px-3">
          <div
            onClick={() => {
              connect(role);
            }}
            className="bg-gradient-to-r w-full from-cyan-500 to-blue-500 px-6 py-3 rounded-lg text-center cursor-pointer text-white"
          >
            Connect
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
