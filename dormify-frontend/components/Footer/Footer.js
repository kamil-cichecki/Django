import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="h-[300px] flex flex-col text-white">
      <h1 className=" mt-9 ml-16 text-3xl text-center">Kontakt</h1>
      <div className="flex flex-row w-full text-2xl mt-9">
        <div className="w-[50%] flex flex-col items-center">
          <h1>Oskar Bielecki</h1>
          <div>
            <Link
              href="https://www.linkedin.com/in/oskarbielecki/"
              className="flex flex-row gap-3 mt-6 items-center"
            >
              <FaLinkedinIn className="text-sm" />
              <p className="text-sm">
                https://www.linkedin.com/in/oskarbielecki/
              </p>
            </Link>
            <div className="flex flex-row gap-3 mt-6 items-center">
              <CiMail className="text-sm" />
              <p className="text-sm">bieleckioskar@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex flex-col items-center">
          <h1>Kamil Cichecki</h1>
          <div>
            <Link
              href="https://www.linkedin.com/in/kamilcichecki/"
              className="flex flex-row gap-3 mt-6 items-center"
            >
              <FaLinkedinIn className="text-sm" />
              <p className="text-sm">
                https://www.linkedin.com/in/kamilcichecki/
              </p>
            </Link>
            <div className="flex flex-row gap-3 mt-6 items-center">
              <CiMail className="text-sm" />
              <p className="text-sm">kamil.cichecki00@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
