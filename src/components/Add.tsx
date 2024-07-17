"use client";

import React, { useState } from "react";

const Add = () => {
  const [quantity, setQuantity] = useState(1);

  const stock = 4;

  const handleQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => (prev < stock ? prev + 1 : stock));
    } else {
      setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              disabled={quantity === 1}
              onClick={() => handleQuantity("decrement")}
              className={`cursor-pointer text-xl disabled:opacity-[0.5]`}
            >
              -
            </button>
            {quantity}
            <button
              disabled={quantity === stock}
              onClick={() => handleQuantity("increment")}
              className="cursor-pointer text-xl  disabled:opacity-[0.5]"
            >
              +
            </button>
          </div>
          <div className="text-xs">
            Only <span className="text-orange-500">{stock} items</span> left!
            <br /> {"Don't"}
            miss it
          </div>
        </div>
        <button className="w-36 text-sm rounded-3xl ring-1 ring-red text-red py-2 px-4 hover:bg-red hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
