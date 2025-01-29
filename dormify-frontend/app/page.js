'use client';
import { useState } from 'react';
import Image from 'next/image';
import HomeInfo from '@/components/Home/HomeInfo';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <section id="home">
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#001_60%,#61e_100%)]"></div>

        <Navbar />
        <div className="w-full h-screen items-center flex flex-col justify-center">
          <h2 className="text-white text-6xl text-center font-bolder">
            Witamy w Dormify
          </h2>
          <div className="flex flex-row w-[80%] gap-20 items-center justify-center">
            <div className=" w-[500px] h-[300px] text-justify items-center justify-center flex flex-col rounded-full p-24 border-b-2 border-violet-200">
              <p className="text-white text-xl">
                Doomify to nowoczesne narzędzie do zarządzania administracją i
                mieszkańcami akademika. Ułatwia zarządzanie danymi, zgłoszeniami
                technicznymi oraz komunikację z mieszkańcami. Przejrzystość i
                wygoda w jednym miejscu!
              </p>
            </div>
          </div>
          <div className="w-full mt-9 flex text-center justify-center items-center">
            <button className="text-black font-bold text-2xl bg-gray-100 p-4 rounded-xl border-2">
              <Link href="/rejestracja">Zgłoś budynek</Link>
            </button>
          </div>
        </div>
        <HomeInfo />
        <Footer />
      </div>
    </section>
  );
}
