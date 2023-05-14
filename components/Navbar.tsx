import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-black">
      <div>
        <Image src="/dank.svg" alt="logo" width={87} height={32} />
      </div>
      <button className="mr-6 flex flex-col space-y-1.5 text-white">
        <hr className="w-[22px] rounded-3xl border-2 border-white" />
        <hr className="w-[22px] rounded-3xl border-2 border-white" />
      </button>
    </nav>
  );
}

export default Navbar;
