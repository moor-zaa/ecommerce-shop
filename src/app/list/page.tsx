import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import React, { Suspense } from "react";

const ALL_PRODUCTS_ID = "00000000-000000-000000-000000000001";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  let response;
  try {
    const wixClient = await wixClientServer();
    response = await wixClient.collections.getCollectionBySlug(
      searchParams.cat || "all-products"
    );
  } catch (error) {}

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden sm:flex bg-pink-50 px-4 justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Lorem ipsum dolor <br /> sit amet.
          </h1>
          <button className="rounded-3xl bg-red text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src={"/woman.png"} fill className="object-contain" alt="" />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="text-xl mt-12 font-semibold">
        {response?.collection?.name} Products For You!
      </h1>
      <Suspense fallback="loading...">
        <ProductList
          categoryId={response?.collection?._id || ALL_PRODUCTS_ID}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
