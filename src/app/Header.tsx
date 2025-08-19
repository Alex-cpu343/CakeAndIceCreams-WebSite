"use client"
import React from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-[#ffb0b9] flex  p-4 rounded-t-lg justify-between items-center italic border-b-2 border-[#c07e97]">

      <div className="flex gap-10 relative left-10">
       <a
  href="/"
  className={`text-2xl font-sans relative pb-2 
    after:block after:h-1  after:absolute after:bottom-0 after:left-0 after:right-0 after:transition-all after:duration-300
    ${pathname === "/" ? "after:bg-[#da5f69] " : "after:bg-transparent"}
    hover:after:bg-[#553743]  after:top-[6.7vh] after:h-2 after:w-auto `}
>
  Home
</a>
        <a
          href="/Products"
           className={`text-2xl font-sans relative pb-2 
    after:block after:h-1  after:absolute after:bottom-0 after:left-0 after:right-0 after:transition-all after:duration-300
    ${pathname === "/Products" ? "after:bg-[#da5f69] " : "after:bg-transparent"}
   hover:after:bg-[#553743]  after:top-[6.7vh] after:h-2 after:w-auto  `}
>
          Products
        </a>
        <a
          href="/Contact"
           className={`text-2xl font-sans relative pb-2 
    after:block after:h-1  after:absolute after:bottom-0 after:left-0 after:right-0 after:transition-all after:duration-300
    ${pathname === "/Contact" ? "fter:bg-[#da5f69] " : "after:bg-transparent"}
    hover:after:bg-[#553743]  after:top-[6.7vh] after:h-2 after:w-auto  `}
>
          Contact
        </a>
        <a
          href="/About"
          className={`text-2xl font-sans relative pb-2
            after:block after:h-1  after:absolute after:bottom-0 after:left-0 after:right-0 after:transition-all after:duration-300
            ${pathname === "/About" ? "after:bg-[#da5f69]" : "after:bg-transparent"}
           hover:after:bg-[#553743]  after:top-[6.7vh] after:h-2 after:w-auto `}
        >
          About
        </a>
      </div>



      <div className="flex  relative right-10">
    
        <a
          href="/Sign"
          className=" flex items-center text-xl font-bold italic relative bg-[#da5f69] rounded-3xl hover:bg-[#e093b1] transition-colors duration-300  w-30 h-11 justify-center"
        >
          Sign in
        </a>
      </div>
    </header>
  )
}
