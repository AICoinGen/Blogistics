import React, { useState, useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Spinner from "./spinner";
// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
import { Web3Storage } from "web3.storage";

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ2ZjJBNTUzOTQ0Y2EwNzRlOGE0NzA5ZTg1MzEyM2VmNzcxODRBNzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAxNTM2NTUzNDAsIm5hbWUiOiJteWRvbmF0ZSJ9.GdZsK2GJfQSyIUhcokLjvCnijLy2zMjrdolfb8uusbQ";
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

const FundRaising = (props) => {
  const [fileUrl, setFileUrl] = useState(null);
  const { signer } = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [formInput, updateFormInput] = useState({
    name: "",
    price: "",
    category: "",
    manufactureDate: "",
    expiryDate: "",
  });

  async function onChange(e) {
    const files = e.target.files[0];
    const client = makeStorageClient();
    const cid = await client.put([files]);
    console.log("stored files with cid:", cid);

    const res = await client.get(cid);
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    if (!res.ok) {
      throw new Error(
        `failed to get ${cid} - [${res.status}] ${res.statusText}`
      );
    }

    // unpack File objects from the response
    const filess = await res.files();
    setFileUrl(`https://${cid}.ipfs.dweb.link/${files.name}`);
    console.log(files);
    for (const file of filess) {
      console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
    }
    return cid;
  }

  async function addProduct() {
    const manufactureDate = new Date(formInput.manufactureDate);
    const expiryDate = new Date(formInput.expiryDate);

    let transaction = await signer.addProduct(
      formInput.name,
      formInput.price,
      fileUrl,
      formInput.category,
      Math.floor(manufactureDate.getTime() / 1000),
      Math.floor(expiryDate.getTime() / 1000)
    );

    setloading(true);
    await transaction.wait();
    setloading(false);
    alert("Product uploaded succesfully");
    window.location.reload();
  }

  return (
    <div className="p-5 font-Montserrat overflow-auto">
      <p className="text-center text-gray-500 text-lg">Add a Product</p>
      <div className="py-3 space-y-3">
        <input
          type="text"
          required={true}
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter Product name "
        />
        <input
          type="text"
          required={true}
          onChange={(e) =>
            updateFormInput({ ...formInput, category: e.target.value })
          }
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter category name "
        />

        <p>Manufacture date</p>
        <input
          type="date"
          required={true}
          onChange={(e) =>
            updateFormInput({ ...formInput, manufactureDate: e.target.value })
          }
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter manufacturer date "
        />

        <p>Expiry date</p>
        <input
          type="date"
          required={true}
          onChange={(e) =>
            updateFormInput({ ...formInput, expiryDate: e.target.value })
          }
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter expiry date"
        />
        <input
          type="number"
          required={true}
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Price in USD"
        />

        <input
          required={true}
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {fileUrl && <img className="rounded mt-4" width="150" src={fileUrl} />}
        <div
          onClick={addProduct}
          className="bg-gradient-to-r flex flex-row justify-center items-center from-cyan-500 to-blue-500 px-6 py-3 rounded-lg text-center cursor-pointer text-white"
        >
          {loading ? <Spinner /> : "Continue"}
        </div>
      </div>
    </div>
  );
};

export default FundRaising;
