import React from 'react';
import Link from 'next/link';

const Sidenavbar = () => {
  return (
    <div className="flex flex-col w-[15%] h-screen p-3">
      <div className="bg-white w-full h-full rounded-lg flex flex-col items-center relative">
        <h1 className="text-center text-black mt-32 text-4xl font-semibold">
          Dormify
        </h1>
        <nav className="flex flex-col text-black mt-24">
          <ul className="flex flex-col items-center justify-center gap-10 font-semibold">
            <li>
              <Link href={'#'}>Strona główna</Link>
            </li>
            <li>
              <Link href={'#'}>Mieszkańcy</Link>
            </li>
            <li>
              <Link href={'#'}>Pokoje</Link>
            </li>
            <li>
              <Link href={'#'}>Zgłoszenia</Link>
            </li>
            <li>
              <Link href={'#'}>Płatności</Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 text-black left-0  w-full mb-9 h-16 flex items-center justify-items-center justify-center">
          <button className=" p-4 rounded-lg font-semibold bg-gray-100">
            Wyloguj się
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidenavbar;
