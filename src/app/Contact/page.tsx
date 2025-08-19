"use client";
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';

import React from 'react';

export default function Products() {
  return (
    <> <h1 className='text-4xl font-bold'>Contact</h1>
  <main className='relative   -left-7'>

   
    <div className='flex bg-[#ffbdc5b5] flex-col-2 relative w-[94vw] '>
<section className='flex flex-col relative left-15  '>


 
      <div>
        <h2 className='text-3xl font-semibold'>Address</h2>
        <p className=' text-xl'>  123 Sweet Street,Dessertville,Candyland</p>
      </div>
   
      <div>
        <h2 className='text-3xl font-semibold'>Phone</h2>
        <p className=' text-xl' > +1(000) 123-4567</p>
      </div>
   
      <div>
        <h2 className='text-3xl font-semibold'>Email</h2>
        <p className=' text-xl'> hello@SweetIceCreamsandCakes.com</p>
      </div>
   
      <div>
        <h2 className='text-3xl font-semibold'>Opening Hours</h2>
        <p className=' text-xl'> Mon-Fri:9:00-19:00</p>
        <p className=' text-xl'> Sat-Sun:10:00-19:00</p>
      </div>
  </section>

    <div className='flex justify-center items-center relative left-70 '>
<Image src="/Contact.png" alt="Contact Us" width={500} height={300} className="object-cover rounded-md  h-100 border-3 border-red-300 " unoptimized />
    </div>
    </div>
  </main>
    
    </>
  );
}
