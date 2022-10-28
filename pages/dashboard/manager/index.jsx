import React, { useState, useRef, useEffect, useContext } from "react";

import Sidebar from "../../../components/adminPartials/Sidebar";
import Header from "../../../components/adminPartials/Header";
import WelcomeBanner from "../../../components/adminPartials/dashboard/WelcomeBanner";
import Orders from "../../../components/adminPartials/dashboard/Orders";
import OrdersCard from "../../../components/adminPartials/dashboard/OdersCards";
import OrdersPendingCard from "../../../components/adminPartials/dashboard/OrdersPendingCard";
import OrderCancelCard from "../../../components/adminPartials/dashboard/OrderCancelCard";
import Modal from "../../../components/Modal";
import { useRouter } from "next/router";
import ApproveOrder from "../../../components/adminPartials/dashboard/ApproveOrder";
import ConfrimOrders from "../../../components/adminPartials/dashboard/ConfirmOrders";
import { AuthContext } from "../../../utils/AuthProvider";
import { ethers } from "ethers";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("");
  const [orders, setorders] = useState([]);
  const [_orders, _setorders] = useState([]);
  const [confirmed, setconfirmed] = useState([]);
  const [pending, setpending] = useState([]);
  const router = useRouter();
  const [ethprice, setethprice] = useState(0);
  const [productData, setproductData] = useState([]);

  const { address, signer } = useContext(AuthContext);

  useEffect(() => {
    if (address) {
      const loadOrders = async () => {
        const data_ = await signer.fetchProductItems();
        setproductData(data_);
        const data = await signer.fetchOrderItems();
        let validate = await signer.validateRole("manager", address);
        if (!validate) {
          router.push("/");
        }

        const pending = data.filter((p) => p.confirmed === false);
        const confirm = data.filter((p) => p.confirmed === true);
        const orders = await signer.fetchOrdersConfirm();

        let ethUSDPrice = 1178.23;
        setethprice(ethUSDPrice);
        setpending(pending);
        setconfirmed(confirm);
        setorders(orders);
      };
      loadOrders();
    }
  }, [signer]);

  if (address) {
    if (typeof window !== "undefined") {
      let managerAddr = localStorage.getItem("managerAddr");
      if (managerAddr !== address) {
        router.push("/");
      } else {
      }
    }
  } else {
  }

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
              {/* Welcome banner */}
              <WelcomeBanner
                type="Manager"
                message="Here are some orders to confirm"
              />
              {/* Cards */}

              <div className="grid grid-cols-12 gap-6">
                <OrdersPendingCard pendingorders={pending.length} />
                <ConfrimOrders confirmed={confirmed.length} />
                <ApproveOrder
                  orders={orders}
                  confirmedorders={confirmed}
                  ethprice={ethprice}
                  productData={productData}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* if not authenticated? return false else setOpen is true */}
      <Modal open={open} onClose={() => setOpen(!auth ? true : false)}>
        {comp}
      </Modal>
    </>
  );
}

export default Dashboard;
