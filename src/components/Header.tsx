"use client";

import Link from "next/link";
import ChangeLocale from "./ChangeLocale";
import { HiMiniHome } from "react-icons/hi2";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname();
  // const hrefName = pathName.split("/")[1];
  return (
    <header className='border-b p-[10px]'>
      <div className='flex justify-between items-center my-0 mx-auto w-[85%]'>
        <Link href='/' className='group'>
          <HiMiniHome
            size='30'
            className='group-hover:text-orange-500'
            style={{ color: "darkorange" }}
          />
        </Link>
        <span>CLF-C02</span>
        <ChangeLocale />
      </div>
    </header>
  );
}
