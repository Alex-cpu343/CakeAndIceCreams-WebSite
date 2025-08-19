"use client"
import React, { useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-[#ffb0b9] flex p-4 rounded-t-lg justify-between items-center italic border-b-2 border-[#c07e97]">

      <div className="text-2xl font-bold h md:hidden relative left-2">CakeAndIceCream</div>


      <div className="hidden md:flex gap-10 relative left-10">
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
            ${pathname === "/Contact" ? "after:bg-[#da5f69] " : "after:bg-transparent"}
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


      <div className="hidden md:flex relative right-10">
        <a
          href="/Sign"
          className="flex items-center text-xl font-bold italic relative bg-[#da5f69] rounded-3xl hover:bg-[#e093b1] transition-colors duration-300 w-30 h-11 justify-center"
        >
          Sign in
        </a>
      </div>

  
      <div className="md:hidden relative right-2 flex   items-center gap-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-4 py-2 bg-[#da5f69] text-white rounded-xl hover:bg-[#e093b1] transition-colors duration-300 w-20 h-10"
        >
          Menu
        </button>

        {menuOpen && (
          <div className="absolute top-full right-2 mt-2 w-40 bg-[#ffb0b9] rounded-lg shadow-lg overflow-hidden flex flex-col z-50">
            <a
              href="/"
              className={`block px-4 py-2 hover:bg-[#e093b1] ${pathname === "/" ? "bg-[#da5f69] text-white" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/Products"
              className={`block px-4 py-2 hover:bg-[#e093b1] ${pathname === "/Products" ? "bg-[#da5f69] text-white" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Products
            </a>
            <a
              href="/Contact"
              className={`block px-4 py-2 hover:bg-[#e093b1] ${pathname === "/Contact" ? "bg-[#da5f69] text-white" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="/About"
              className={`block px-4 py-2 hover:bg-[#e093b1] ${pathname === "/About" ? "bg-[#da5f69] text-white" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
            <a
              href="/Sign"
              className={`block px-4 py-2 hover:bg-[#e093b1] ${pathname === "/Sign" ? "bg-[#da5f69] text-white" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
