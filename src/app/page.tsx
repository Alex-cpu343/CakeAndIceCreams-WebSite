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
      <main>
        <div className="flex h-110 absolute top-[13.5vh] w-[94vw] left-[3.4vh] bg-[#ffb0b9] rounded-b-xl">
          <div className="bg-[#ffb0b9] w-[52.5vw] h-[45.6vh] flex items-center justify-center relative top-8 overflow-hidden">
            <Image
              src="/IceCrams.png"
              alt="Strawberry ice cream"
              width={650}
              height={600}
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col justify-center items-start gap-2">
            <h1 className="text-7xl font-bold text-[#2e2525]">
              Ice Creams <br /> & Cakes
            </h1>
            <p className="text-xl">Delicious treats made with love.</p>
            <Link href="/Products">
              <button className="flex items-center text-xl font-bold italic relative bg-[#da5f69] rounded-3xl hover:bg-[#e093b1] transition-colors duration-300 h-11 justify-center w-[10vw] cursor-pointer">
                Shop Now
              </button>
            </Link>
          </div>
        </div>

        <section className="relative top-[55vh] p-6">
          <h2 className="text-8xl font-semibold text-[#2e2525] ">
            Popular Products
          </h2>

          <div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-3  ">
            {popular.map((product: any) => (
              <div
                key={product.id}
                className="  rounded-xl shadow-lg hover:shadow-2xl transition flex "
              >
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="mb-1">Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                <button
                  className="mt-2 px-4 py-1 bg-[#da5f69] rounded hover:bg-bg-[#e093b1] text-white cursor-pointer"
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
