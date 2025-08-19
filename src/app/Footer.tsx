'use client'

export default function Footer() {

    return (
        <footer className="bg-[#ffb0b9] p-4 rounded-b-lg text-center h-20  border-[#c07e97] ">
        <p className="text-sm text-[#2e2525]">
            &copy; {new Date().getFullYear()} Cake and Ice Creams. All rights reserved.
        </p>
        </footer>
    );
    }