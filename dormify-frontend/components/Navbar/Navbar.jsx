import React from 'react';

export default function Navbar() {
  return (
    <>
      <nav className=" text-white w-full h-24 flex flex-row justify-between items-center text-xl pr-9 pl-9">
        <div className="text-2xl font-bold">Dormify</div>
        <div>
          <ul className="flex w-fit h-fit flex-row gap-5 items-center ml-40">
            <li>Strona główna</li>
            <li>O nas</li>

            <li>Kontakt</li>
          </ul>
        </div>
        <div className="flex w-fit h-fit flex-row items-center gap-5">
          <button className="">Zaloguj się</button>
          <button className="border-2 rounded-lg bg-violet-950 border-violet-950 p-2">
            Administracja
          </button>
        </div>
      </nav>
    </>
  );
}
