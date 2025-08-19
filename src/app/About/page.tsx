"use client";
import React from "react";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ffe6ea] to-[#fff0f5] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl p-10 text-center">
        <h1 className="text-5xl font-extrabold text-[#2e2525] mb-6">
          About Us
        </h1>
        <p className="text-xl text-[#4a3b3b] mb-4">
          Welcome to our sweet world! We specialize in creating delicious ice creams and cakes made with love and the finest ingredients.
        </p>
        <p className="text-lg text-[#4a3b3b] mb-4">
          Our mission is to bring joy to every bite and make your moments special with our handcrafted treats.
        </p>
        <p className="text-lg text-[#4a3b3b]">
          We believe that desserts are more than just food – they are experiences, memories, and moments of happiness shared with loved ones.
        </p>
      </div>
    </main>
  );
}
