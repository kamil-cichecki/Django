'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/login');
  };

  const handleClickAdmin = (e) => {
    e.preventDefault();
    router.push('/manager');
  };

  return (
    <>
      <nav className=" text-white backdrop-blur-sm w-full h-24 flex flex-row justify-between items-center text-xl pr-9 pl-9 fixed">
        <div className="text-2xl font-bold">Dormify</div>
        <div>
          <ul className="flex w-fit h-fit flex-row gap-5 items-center ml-40">
            <li>Strona główna</li>
            <li>O nas</li>

            <li>Kontakt</li>
          </ul>
        </div>
        <div className="flex w-fit h-fit flex-row items-center gap-5">
          <button onClick={handleClick}>Zaloguj się</button>
          <button
            onClick={handleClickAdmin}
            className="border-2 rounded-lg bg-violet-950 border-violet-950 p-2"
          >
            Menadżer
          </button>
        </div>
      </nav>
    </>
  );
}
