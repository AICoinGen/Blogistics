import React, { useState, useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import Spinner from "./spinner";
const ReviewModal = ({ id }) => {
  const { signer } = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [formInput, updateFormInput] = useState({
    description: "",
  });

  const addReveiw = async () => {
    try {
      const transaction = await signer.addReveiw(id, formInput.description);
      setloading(true);
      await transaction.wait();
      setloading(false);
      alert("order recieved succesfully");
    } catch (err) {
      alert("You dont have permission to perform this action");
    }
  };

  return (
    <div className="p-5 font-Montserrat overflow-auto">
      <p className="text-center text-gray-500 text-lg">Review or suggestions</p>
      <div className="py-3 space-y-3">
        <textarea
          type="text"
          required={true}
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
          cols={6}
          className="w-full py-3 outline-none ring-2 rounded-lg p-3"
          placeholder="Enter description"
        ></textarea>

        <button
          onClick={() => {
            addReveiw();
          }}
          type="submit"
          className="bg-gradient-to-r flex flex-row justify-center items-center w-full from-cyan-500 to-blue-500 px-6 py-3 rounded-lg text-center cursor-pointer text-white"
        >
          {loading ? <Spinner /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
