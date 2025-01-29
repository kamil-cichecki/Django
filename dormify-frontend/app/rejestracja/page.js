'use client';
import React from 'react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdOutlinePassword } from 'react-icons/md';
import { registerDom } from '@/lib/registerDom';

export default function User() {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [pCode, setPCode] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await registerDom(name, street, streetNumber, pCode, city);
      alert('Zarejestrowano pomyślnie');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#001_60%,#61e_100%)]"></div>

      <div className="bg-violet-950 w-[600px] h-[600px] bg-opacity-50 rounded-xl border-t-4 flex flex-col items-center relative">
        <h1 className="text-3xl mt-9 opacity-70">Zgłoś budynek</h1>
        <form onSubmit={handleSubmit} className="gap-8 flex flex-row mt-32 ">
          <div className="flex flex-col gap-8">
            <div className="flex flex-row justify-between gap-2 items-center">
              <label>
                <FaUser />
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-lg pl-2 text-black"
                placeholder="Nazwa budynku"
              />
            </div>
            <div className="flex flex-row justify-between gap-2 items-center">
              <label>
                <MdOutlinePassword />
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
                className="rounded-lg pl-2 text-black"
                placeholder="Ulica"
              />
            </div>
            <div className="flex flex-row justify-between gap-2 items-center">
              <label>
                <MdOutlinePassword />
              </label>
              <input
                type="number"
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
                required
                className="rounded-lg pl-2 text-black"
                placeholder="Numer budynku"
                min="0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-row justify-between gap-2 items-center">
              <label>
                <MdOutlinePassword />
              </label>
              <input
                type="text"
                value={pCode}
                onChange={(e) => setPCode(e.target.value)}
                required
                className="rounded-lg pl-2 text-black"
                placeholder="Kod pocztowy"
              />
            </div>
            <div className="flex flex-row justify-between gap-2 items-center">
              <label>
                <MdOutlinePassword />
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="rounded-lg pl-2 text-black"
                placeholder="Miasto"
              />
            </div>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="absolute bottom-0 left-0 w-full flex flex-col items-center mb-16">
            <button
              type="submit"
              className=" items-center text-center bg-white text-violet-950 font-bold py-3 px-6 text-2xl rounded-lg"
            >
              Zgłoś
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
