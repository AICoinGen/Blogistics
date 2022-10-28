import React, { useState, useRef, useEffect, useContext } from "react";

import Sidebar from "../../../components/adminPartials/Sidebar";
import Header from "../../../components/adminPartials/Header";
import WelcomeBanner from "../../../components/adminPartials/dashboard/WelcomeBanner";
import Orders from "../../../components/adminPartials/dashboard/Orders.tsx";
import OrdersCard from "../../../components/adminPartials/dashboard/OdersCards";
import OrdersPendingCard from "../../../components/adminPartials/dashboard/OrdersPendingCard";
import OrderCancelCard from "../../../components/adminPartials/dashboard/OrderCancelCard";
import Modal from "../../../components/Modal";
import { AuthContext } from "../../../utils/AuthProvider";

import AdminAuthModal from "../../../components/AdminAuthModal.jsx";
import UsersCard from "../../../components/adminPartials/dashboard/UsersCard";
import UserRoles from "../../../components/adminPartials/dashboard/UserRoles";
import AllOrders from "../../../components/adminPartials/dashboard/AllOrders";
import AllCustomers from "../../../components/adminPartials/dashboard/AllCustomers";
// import AddProductModal from ".../../../components/AddProductModal";
import AddProductModal from "../../../components/AddProductModal";
import { ethers } from "ethers";
import AllProducts from "../../../components/adminPartials/dashboard/AllProducts";
import AllProductsAdded from "../../../components/adminPartials/dashboard/AllProductsAdded";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("");
  const { address, signer, contract } = useContext(AuthContext);
  const [customers, setcustomers] = useState([]);
  const [orders, setorders] = useState([]);
  const [pending, setpending] = useState([]);
  const [returned, setreturned] = useState([]);
  const [ethprice, setethprice] = useState(0);
  const [auth, setauth] = useState(false);
  const [productData, setproductData] = useState([]);
  useEffect(() => {
    if (address) {
      const loadOrders = async () => {
        const data_ = await signer.fetchProductItems();
        setproductData(data_);
        const data = await signer.fetchOrderItems();

        let ethUSDPrice = 1178.23;
        setethprice(ethUSDPrice);
        let customers = data.filter(
          (v, i, a) => a.findIndex((v2) => v2.owner === v.owner) === i
        );
        const pending = data.filter((p) => p.pending === false);
        const returned = data.filter((r) => r.returned === true);
        // const allOrders = await signer.fetchOrderItems();
        setcustomers(customers);
        setorders(data);
        setreturned(returned);
        setpending(pending);
        console.log(customers);
      };
      loadOrders();
    }
  }, [signer]);

  // console.log(returned.length);
  useEffect(() => {
    let auth = localStorage.getItem("auth");
    console.log(auth);
    setauth(auth);
    if (!auth || auth === "false") {
      setOpen(true);
      setComp(<AdminAuthModal />);
    } else {
      setOpen(false);
    }
  }, []);

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
              <WelcomeBanner type="Admin" />
              {/* Cards */}
              <div className="sm:flex sm:justify-end sm:items-center mb-8">
                <div className="grid grid-flow-col sm:auto-cols-max justify-end sm:justify-end gap-2">
                  <button
                    onClick={() => {
                      setOpen(!open);
                      setComp(<AddProductModal />);
                    }}
                    className="px-4 py-2 flex flex-row items-center justify-center bg-indigo-500 rounded-md hover:bg-indigo-600 text-white"
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className=" xs:block ml-2">Add Product</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6">
                <UsersCard users={customers.length} />
                <OrdersCard allorders={orders.length} />
                <OrdersPendingCard allpending={pending.length} />
                <OrderCancelCard allreturned={returned.length} />
                <OrderCancelCard allreturned={returned.length} />
                <AllProducts allproducts={productData.length} />
                <AllOrders
                  productData={productData}
                  orders={orders}
                  ethprice={ethprice}
                />
                <UserRoles />
                <AllCustomers customer={customers} />
                <AllProductsAdded products={productData} />
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
