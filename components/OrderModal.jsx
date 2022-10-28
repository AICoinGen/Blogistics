import React, { useState, useContext, useEffect } from "react";
import { productData } from "../utils/sample-data";
import { AuthContext } from "../utils/AuthProvider";
import { ethers } from "ethers";
import Spinner from "./spinner";

const OrderModal = (props) => {
  const [quantity, setquantity] = useState(1);
  const [productname, setproductname] = useState("");
  const [address_, setaddress] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [zip, setzip] = useState("");
  const [loading, setloading] = useState(false);
  const [orders, setorders] = useState([]);
  const [productData, setproductData] = useState([]);
  const [price, setprice] = useState(0);
  const [price_, setprice_] = useState(0);
  const [_price, _setprice] = useState(0);
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

  let filterImage = productname.length
    ? productData.filter((p) => p.name === productname)
    : [
        {
          price: 0,
          hash: "",
        },
      ];

  console.log(filterImage);

  const onsubmitOrderHandler = async () => {
    let price = ((filterImage[0].price * quantity) / 1174.33).toFixed(7);
    const amount_ = ethers.utils.parseUnits(price.toString(), "ether");
    let transaction = await signer.addOrderItem(
      productname,
      quantity,
      address_,
      phonenumber,
      city,
      zip,
      state,
      {
        value: amount_,
      }
    );
    setloading(true);
    await transaction.wait();
    setloading(false);
    alert("Order sent succesfully");
    window.location.reload();
  };

  // const convertEthusd = async (usd) => {
  //   // console.log(usd);
  //   const data = await signer.getEthUsd();
  //   let number = Number(data.toString());
  //   let ethUSDPrice = 1178.23;
  //   // console.log(res);
  //   let res = Number(usd / ethUSDPrice).toFixed(5);
  //   let res_ = (usd / ethUSDPrice).toFixed(7);

  //   setprice(res);
  //   setprice_(res_);
  // };
  // convertEthusd(Math.floor(filterImage[0].price * quantity));

  return (
    <>
      <p className=" text-gray-500 uppercase text-md pb-4 font-bold">
        Add Order
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onsubmitOrderHandler();
        }}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Product
            </label>
            <div className="relative">
              <select
                required
                onChange={(e) => {
                  setproductname(e.target.value);
                }}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option>Select Product</option>
                {productData.map((product) => (
                  <option value={product.name}>{product.name}</option>
                ))}
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
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Quantity
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="number"
              required
              value={quantity}
              onChange={(e) => setquantity(e.target.value)}
              placeholder="quantity"
            />
          </div>
        </div>
        <div>
          <img
            src={filterImage.length > 0 ? filterImage[0].hash : ""}
            className="mb-4"
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Address Line 1
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              value={address_}
              onChange={(e) => {
                setaddress(e.target.value);
              }}
              required
              placeholder="address"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-1">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Phone Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              value={phonenumber}
              onChange={(e) => {
                setphonenumber(e.target.value);
              }}
              required
              placeholder="+233 ********"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              City
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              value={city}
              onChange={(e) => {
                setcity(e.target.value);
              }}
              placeholder="Accra"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              State
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              required
              value={state}
              onChange={(e) => {
                setstate(e.target.value);
              }}
              placeholder="Tema"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              value={zip}
              onChange={(e) => {
                setzip(e.target.value);
              }}
              placeholder="90210"
              required
            />
          </div>
        </div>
        <div className="flex items-start">
          <div className="text-xl font-bold text-slate-800 mr-2">
            Total cost : ${filterImage[0].price * quantity}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 mt-4">
          <div className="w-full px-3">
            <button
              type="submit"
              className="bg-gradient-to-r flex flex-row justify-center items-center w-full from-cyan-500 to-blue-500 px-6 py-3 rounded-lg text-center cursor-pointer text-white"
            >
              {loading ? <Spinner /> : "Make Order"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default OrderModal;
