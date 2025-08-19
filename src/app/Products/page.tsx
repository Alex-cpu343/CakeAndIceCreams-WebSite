"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_TO_CART } from "../Redux/ActionType";

export default function Products() {
  const products = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  const addToCart = (product: any) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  return (
    <main className="p-6 min-h-[75vh]">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#2e2525] text-center sm:text-left">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="flex flex-col items-start justify-between p-4 rounded-lg shadow hover:shadow-2xl transition bg-white"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h3>
            <p className="mb-1 text-lg sm:text-xl">Price: ${product.price}</p>
            <p className="mb-2 text-lg sm:text-xl">Stock: {product.stock}</p>
            <button
              className="mt-auto px-4 py-2 bg-[#da5f69] rounded hover:bg-[#e093b1] text-white shadow transition duration-300 w-full sm:w-auto text-center"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
