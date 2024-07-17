import Add from "@/components/Add";
import CustomizeProduct from "@/components/CustomizeProduct";
import ProductImages from "@/components/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import React from "react";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];

  console.log(products);
  return (
    <div className="py-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMAGE CONTAINER  */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEZT CONTAINER */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          {product.price?.price === product.price?.discountedPrice ? (
            <h3 className="text-2xl font-medium">
              ${product.price?.discountedPrice}
            </h3>
          ) : (
            <>
              <h3 className="text-xl text-gray-500 line-through">
                ${product.price?.price}
              </h3>
              <h3 className="text-2xl font-medium">
                ${product.price?.discountedPrice}
              </h3>
            </>
          )}
        </div>
        <div className="h-[2px] bg-gray-100" />
        {product.variants && product.productOptions && (
          <CustomizeProduct
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        )}
        <Add />
        <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((section: any) => (
          <div key={section.title} className="text-sm">
            <h4 className="mb-4 font-medium">{section.title}</h4>
            <p>{section.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
