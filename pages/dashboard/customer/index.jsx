import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../../../components/adminPartials/Sidebar";
import Header from "../../../components/adminPartials/Header";
import WelcomeBanner from "../../../components/adminPartials/dashboard/WelcomeBanner";
import Orders from "../../../components/adminPartials/dashboard/Orders";
import OrdersCard from "../../../components/adminPartials/dashboard/OdersCards";
import OrdersPendingCard from "../../../components/adminPartials/dashboard/OrdersPendingCard";
import OrderCancelCard from "../../../components/adminPartials/dashboard/OrderCancelCard";
import Modal from "../../../components/Modal";
import OrderModal from "../../../components/OrderModal.jsx";
import { AuthContext } from "../../../utils/AuthProvider";
import { useRouter } from "next/router";
import { ethers } from "ethers";

// import Content from "../../../components/customer/content";
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("");
  const [orders, setorders] = useState([]);
  const [pending, setpending] = useState([]);
  const [returned, setreturned] = useState([]);
  const router = useRouter();
  const [cancel, setcancel] = useState("");
  const { address, signer } = useContext(AuthContext);
  const [ethprice, setethprice] = useState(0);
  const [productData, setproductData] = useState([]);

  useEffect(() => {
    if (address) {
      const loadOrders = async () => {
        const data_ = await signer.fetchProductItems();
        setproductData(data_);
        const data = await signer.fetchMyOrders();

        let ethUSDPrice = 1178.23;
        setethprice(ethUSDPrice);
        const pending = data.filter((p) => p.pending === true);
        const returned = data.filter((r) => r.returned === true);
        console.log(data);
        setreturned(returned);
        setpending(pending);
        setorders(data);
        // console.log(items);
      };
      loadOrders();
    }
  }, [signer]);

  if (address) {
    if (typeof window !== "undefined") {
      let customerAddress = localStorage.getItem("customerAddr");
      if (customerAddress !== address) {
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

        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-800">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Welcome banner */}
              {/* Cards */}
               <p className="text-2xl font-bold text-white">Client</p>
              <div className="sm:flex sm:justify-end sm:items-center mb-8">
                <div className="grid grid-flow-col sm:auto-cols-max justify-end sm:justify-end gap-2">
                  <button
                    onClick={() => {
                      setOpen(!open);

                      setComp(<OrderModal />);
                    }}
                    className="px-4 py-2 flex flex-row items-center justify-center  rounded-full bg-green-700 text-white"
                  >
                    
                    <span className=" xs:block ml-2">Add Order</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6">
                <OrdersCard length={orders.length} />
                <OrdersPendingCard length={pending.length} />
                <OrderCancelCard length={returned.length} />
                <Orders
                  orders={orders}
                  ethprice={ethprice}
                  productData={productData}
                />
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

export default Dashboard;
