"use client";

import { products } from "@wix/stores";
import React, { useEffect, useState } from "react";

type CustomizeProductProps = {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
};

type OptionsProps = {
  [key: string]: string;
};

const CustomizeProduct = ({
  productId,
  variants,
  productOptions,
}: CustomizeProductProps) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionsProps>({});
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>()

  useEffect(() => {
    const variant = 
  }, [])
  

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionType]: choice,
    }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div key={option.name} className="flex flex-col gap-4">
          <h4 className="font-medium">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });
              const selected =
                selectedOptions[option.name!] === choice.description!;
              return option.name === "Color" ? (
                <li
                  key={choice.value}
                  onClick={() =>
                    handleOptionSelect(option.name!, choice.description!)
                  }
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    background: choice.value,
                  }}
                  className={`w-8 h-8 rounded-full ring-1 ring-gray-300 relative`}
                >
                  {!disabled && selected && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                  {disabled && (
                    <div className="absolute w-10 h-[2px] bg-red rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </li>
              ) : (
                <li
                  key={choice.value}
                  onClick={() =>
                    handleOptionSelect(option.name!, choice.description!)
                  }
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selected
                      ? "#f35c7a"
                      : disabled
                      ? "#fbcfe8"
                      : "white",
                    color: selected || disabled ? "white" : "#f35c7a",
                    boxShadow: disabled ? "none" : "",
                  }}
                  className="ring-1 ring-red text-red rounded-md py-1 px-4 text-sm"
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CustomizeProduct;
