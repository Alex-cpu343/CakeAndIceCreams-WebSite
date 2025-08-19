"use client";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import React from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { ADD_TO_CART } from "./Redux/ActionType"; 
import Footer from "./Footer";

export default function Home() {
  const products = useSelector((state: any) => state.products);
  const dispatch = useDispatch();
  const popular = products.slice(0, 3);

  const addToCart = (product: any) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  return (
    <>
      <main className="relative">

        <div className="w-full mt-0 flex flex-col lg:flex-row h-auto lg:h-[90vh] bg-[#ffb0b9] rounded-b-xl overflow-hidden relative sm:right-1 xl:right-4">
          
    
          <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-full relative">
            <Image
              src="/IceCrams.png"
              alt="Strawberry ice cream"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

  
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-6 lg:p-16 bg-[#ffb0b980] lg:bg-transparent mt-4 lg:mt-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#2e2525] mb-4">
              Ice Creams <br /> & Cakes
            </h1>
            <p className="text-lg sm:text-xl mb-4">
              Delicious treats made with love.
            </p>
            <Link href="/Products">
              <button className="px-6 py-3 text-lg sm:text-xl font-bold italic bg-[#da5f69] text-white rounded-3xl hover:bg-[#e093b1] shadow-lg transition duration-300">
                Shop Now
              </button>
            </Link>
          </div>
        </div>

        <section className="mt-32 px-6 sm:px-12 lg:px-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold text-[#2e2525] mb-12">
            Popular Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {popular.map((product: any) => (
              <div
                key={product.id}
                className="rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col p-6 bg-white"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">{product.name}</h3>
                <p className="mb-1 text-sm sm:text-base">Price: ${product.price}</p>
                <p className="text-sm sm:text-base">Stock: {product.stock}</p>
                <button
                  className="mt-4 px-4 py-2 bg-[#da5f69] rounded hover:bg-[#e093b1] text-white cursor-pointer shadow"
                  onClick={() => addToCart(product)} 
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
