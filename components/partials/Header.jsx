import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../utils/AuthProvider";
import AuthModal from "../AuthModal";
import Modal from "../Modal";
import Link from "next/link";
function Header() {
  const [top, setTop] = useState(true);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState("");
  // detect whether user has scrolled the page down by 10px

  const { address, disconnect, web3Provider, connect } = useContext(AuthContext);
  console.log(web3Provider);
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={` w-full flex flex-col items-center justify-center h-screen z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex text-3xl text-white italic items-center justify-between h-16 md:h-20">
          Blogistics
        </div>
      </div>
      <div className="grid mx-24 grid-cols-3 gap-10">
        <div onClick={() => {
              connect('customer');
            }}className="ring-1 py-6 cursor-pointer hover:ring-blue-500 ring-white rounded-lg p-6 flex flex-col items-center border-white border-opacity-70">
          <ion-icon
            name="person-outline"
            class="text-3xl text-gray-200"
          ></ion-icon>
          <p className="text-white text-xl">Client</p>
        </div>
        <div
          onClick={() => {
            connect('adminstrator');
          }}
          className="ring-1 py-6 cursor-pointer hover:ring-blue-500 ring-white rounded-lg p-6 flex flex-col items-center border-white border-opacity-70">
          <ion-icon
            name="lock-closed-outline"
            class="text-3xl text-gray-200"
          ></ion-icon>
          <p className="text-white text-xl">Director</p>
        </div>
        <div
          onClick={() => {
            connect('manager');
          }}
          className="ring-1 py-6 cursor-pointer hover:ring-blue-500 ring-white rounded-lg p-6 flex flex-col items-center border-white border-opacity-70">
          <ion-icon
            name="bag-remove-outline"
            class="text-3xl text-gray-200"
          ></ion-icon>
          <p className="text-white text-xl">Manager</p>
        </div>
        <div
        onClick={() => {
          connect('manufacturer');
        }}
          className="ring-1 py-6 cursor-pointer hover:ring-blue-500 ring-white rounded-lg p-6 flex flex-col items-center border-white border-opacity-70">
          <ion-icon
            name="construct-outline"
            class="text-3xl text-gray-200"
          ></ion-icon>
          <p className="text-white text-xl">Manufacturer</p>
        </div>
        <div
        onClick={() => {
          connect('tester');
        }}
          className="ring-1 py-6 cursor-pointer hover:ring-blue-500 ring-white rounded-lg p-6 flex flex-col items-center border-white border-opacity-70">
          <ion-icon
            name="flask-outline"
            class="text-3xl text-gray-200"
          ></ion-icon>
          <p className="text-white text-xl">Evaluator</p>
        </div>
        <div
          onClick={() => {
            connect('transporter');
          }}
          className="ring-1 py-6 cursor-pointer hover:ring-blue-500 ring-white rounded-lg p-6 flex flex-col items-center border-white border-opacity-70">
          <ion-icon
            name="bicycle-outline"
            class="text-3xl text-gray-200"
          ></ion-icon>
          <p className="text-white text-xl">Deliverer</p>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        {comp}
      </Modal>
    </header>
  );
}

export default Header;
