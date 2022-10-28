import React, { useState, useEffect, useContext } from "react";

import Sidebar from "../../../components/adminPartials/Sidebar";
import Header from "../../../components/adminPartials/Header";

import Orders from "../../../components/Admin/Orders.tsx";

import Modal from "../../../components/Modal";
import OrderModal from "../../../components/OrderModal";
import { useRouter } from "next/router";
import { AuthContext } from "../../../utils/AuthProvider";

function Order() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("");
  const router = useRouter();
  const data = router.query;
  let order = {
    id: "",
  };
  if (data.object) {
    order = JSON.parse(data.object);
  }

  console.log(order.id);

  const [orders, setorders] = useState([]);

  const { address, signer } = useContext(AuthContext);

  useEffect(() => {
    if (address) {
      const loadOrders = async () => {
        const data = await signer.fetchMyOrders();
        setorders(data);
      };
      loadOrders();
    }
  }, [signer]);

  const orderFilter = orders.filter((ord) => ord.id.toString() === order.id);
  console.log(orderFilter);

  return (
    <>
      <div className="flex h-screen overflow-hidden font-Montserrat">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="sm:flex sm:justify-end sm:items-center mb-8">
                <div className="grid grid-flow-col sm:auto-cols-max justify-end sm:justify-end gap-2">
                  <button
                    onClick={() => {
                      setOpen(!open);

                      setComp(<OrderModal />);
                    }}
                    className="px-4 py-2 flex flex-row items-center justify-center bg-indigo-500 rounded-md hover:bg-indigo-600 text-white"
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className=" xs:block ml-2">Add Order</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6">
                {/* <OrdersCard /> */}
                {/* <OrdersPendingCard /> */}
                {/* <OrderCancelCard /> */}
                <Orders order={orderFilter} />
              </div>
            </div>
          </main>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        {comp}
      </Modal>
    </>
  );
}

export default Order;
