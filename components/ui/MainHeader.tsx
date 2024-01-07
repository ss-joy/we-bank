import React from "react";
import Link from "next/link";
import MainNavBar from "./MainNavbar";

const MainHeader = (): JSX.Element => {
  return (
    <header className="flex justify-between mx-auto items-center p-2 sm:px-4 md:px-8 2xl:px-10">
      <Link
        href={"/"}
        className="shadow p-4 rounded-xl shadow-fuchsia-300 hover:shadow-slate-500"
      >
        <div>
          <span className="text-4xl text-green-600 ">we</span>
          <span className="text-4xl font-bold text-green-300 ">Bank</span>
        </div>
      </Link>
      <MainNavBar />
    </header>
  );
};

export default MainHeader;
