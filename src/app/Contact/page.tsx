"use client";
import Image from "next/image";
import React from "react";

export default function Contact() {
  return (
    <>
      <main className="min-h-screen px-4 sm:px-12 lg:px-24 py-12 bg-[#ffe6ea]">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12">Contact</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center bg-[#ffbdc5b5] p-6 lg:p-12 rounded-xl">
          
          <section className="flex flex-col gap-6 w-full lg:w-1/2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-1">Address</h2>
              <p className="text-lg sm:text-xl">123 Sweet Street, Dessertville, Candyland</p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-1">Phone</h2>
              <p className="text-lg sm:text-xl">+1 (000) 123-4567</p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-1">Email</h2>
              <p className="text-lg sm:text-xl">hello@SweetIceCreamsandCakes.com</p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-1">Opening Hours</h2>
              <p className="text-lg sm:text-xl">Mon-Fri: 9:00 - 19:00</p>
              <p className="text-lg sm:text-xl">Sat-Sun: 10:00 - 19:00</p>
            </div>
          </section>

          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <Image
              src="/Contact.png"
              alt="Contact Us"
              width={500}
              height={300}
              className="object-cover rounded-lg shadow-lg"
              unoptimized
            />
          </div>
        </div>
      </main>
    </>
  );
}
