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
    <main className="p-6 h-[75vh]">
      <h1 className="text-4xl font-bold mb-6 text-[#2e2525]">All Products</h1>

      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 w-full relative right-5 h-100vh ">
        {products.map((product: any) => (
          <div
            key={product.id}
            className=" p-4 rounded-lg shadow hover:shadow-2xl transition flex  items-center w-[30vw]"
          >
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
            <p className="mb-1 text-xl">Price: ${product.price}</p>
            <p className="text-xl">Stock: {product.stock}</p>
            <button
              className="mt-2 px-4 py-1 bg-[#da5f69] rounded hover:bg-[#e093b1] text-white  h-15"
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
