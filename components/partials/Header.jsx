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

  const { address, disconnect, web3Provider, connect } =
    useContext(AuthContext);
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
      className={` w-full flex flex-col items-center justify-center h-screen z-30 md:bg-opacity-90 transition duration-300 ease-in-out bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <section>
        <div class="max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div class="mx-auto max-w-lg text-center lg:mx-0 lg:text-left">
              <h2 class="text-3xl font-bold sm:text-4xl italic text-white">
                Blogistics
              </h2>

              <p class="mt-4 text-gray-200">
                Blogistics is a blockchain-based logistics platform that enables
                secure and transparent supply chain management. By
                decentralizing the supply chain management process on the
                blockchain, Blogistics provides a higher level of security and
                transparency, as well as immutability.
              </p>

              <a class="mt-8 inline-flex items-center rounded-full border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
                <span class="text-sm font-medium"> Get Started </span>

                <svg
                  class="ml-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>

            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <a
                class="block rounded-xl cursor-pointer border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                onClick={() => {
                  connect("customer");
                }}
              >
                <ion-icon
                  name="person-outline"
                  class="text-3xl text-gray-200"
                ></ion-icon>
                <h2 class="mt-2 font-bold text-white">Client</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-200">
                  Make an order{" "}
                </p>
              </a>

              <a
                class="block rounded-xl cursor-pointer border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                onClick={() => {
                  connect("adminstrator");
                }}
              >
                <ion-icon
                  name="lock-closed-outline"
                  class="text-3xl text-gray-200"
                ></ion-icon>

                <h2 class="mt-2 font-bold text-white">Administrator</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-200">
                  Manage system
                </p>
              </a>

              <a
                class="block rounded-xl cursor-pointer border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                onClick={() => {
                  connect("manager");
                }}
              >
                <ion-icon
                  name="bag-remove-outline"
                  class="text-3xl text-gray-200"
                ></ion-icon>
                <h2 class="mt-2 font-bold text-white">Manager</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-200">
                  Confirm order{" "}
                </p>
              </a>

              <a
                class="block rounded-xl cursor-pointer border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                onClick={() => {
                  connect("manufacturer");
                }}
              >
                <ion-icon
                  name="construct-outline"
                  class="text-3xl text-gray-200"
                ></ion-icon>

                <h2 class="mt-2 font-bold text-white">Manufacturer</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-200">
                  Initiate production{" "}
                </p>
              </a>

              <a
                class="block rounded-xl cursor-pointer border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                onClick={() => {
                  connect("tester");
                }}
              >
                <ion-icon
                  name="flask-outline"
                  class="text-3xl text-gray-200"
                ></ion-icon>
                <h2 class="mt-2 font-bold text-white">Evaluator</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-200">
                  Test the product{" "}
                </p>
              </a>

              <a
                class="block rounded-xl cursor-pointer border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                onClick={() => {
                  connect("transporter");
                }}
              >
                <ion-icon
                  name="bicycle-outline"
                  class="text-3xl text-gray-200"
                ></ion-icon>

                <h2 class="mt-2 font-bold text-white">Deliverer</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-200">
                  Deliver Product{" "}
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex text-3xl mb-3 text-white italic items-center justify-between h-16 md:h-20">
          Blogistics
        </div>
      </div>
      <div className="grid mx-24 grid-cols-2 md:grid-cols-3 gap-4">
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
      </Modal> */}
    </header>
  );
}

export default Header;
