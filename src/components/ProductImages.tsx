"use client";

import Image from "next/image";
import React, { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);

  console.log(items);

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={items[index].image.url}
          alt=""
          fill
          className="object-cover rounded-md"
          sizes="50vw"
        />
      </div>
      <div className="flex justify-between mt-8 gap-4">
        {items.map((item: any, i: number) => (
          <div
            key={item._id}
            onClick={() => setIndex(i)}
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
          >
            <Image
              src={item.image.url}
              alt=""
              fill
              className="object-cover rounded-md"
              sizes="30vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
