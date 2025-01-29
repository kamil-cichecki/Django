'use client';
import React from 'react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdOutlinePassword } from 'react-icons/md';
import { loginUser } from '@/lib/auth';

export default function mainAdmin() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser(login, password);
      console.log(data);
      const user = await data.users;

      if (user.role == 2) {
        //localStorage.clear();
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('role', data.users.role);

        window.location.href = '/mainAdmin/domanage';
      } else {
        alert('Brak użytkownika!');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#001_60%,#61e_100%)]"></div>

      <div className="bg-violet-950 w-[400px] h-[600px] bg-opacity-50 rounded-xl border-t-4 flex flex-col items-center relative">
        <h1 className="text-3xl mt-9 opacity-70">Logowanie</h1>
        <form onSubmit={handleSubmit} className="gap-8 flex flex-col mt-32 ">
          <div className="flex flex-row justify-between gap-2 items-center">
            <label>
              <FaUser />
            </label>
            <input
              type="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              className="rounded-lg pl-2 text-black"
              placeholder="E-mail"
            />
          </div>
          <div className="flex flex-row justify-between gap-2 items-center">
            <label>
              <MdOutlinePassword />
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg pl-2 text-black"
              placeholder="Hasło"
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="absolute bottom-0 left-0 w-full flex flex-col items-center mb-16">
            <button
              type="submit"
              className=" items-center text-center bg-white text-violet-950 font-bold py-3 px-6 text-2xl rounded-lg"
            >
              Zaloguj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
