import Link from "next/link";
import React from "react";
import Image from "next/image";
const Logo = () => {
  return (
    <Link href="/admin">
      <span className="inline-flex items-center justify-center h-20 w-full focus:bg-purple-500 cursor-pointer">
        <Image
          src="/airtrip-logo.png"
          alt="Airtrip logo"
          width={70}
          height={70}
        />
      </span>
    </Link>
  );
};

export default Logo;
