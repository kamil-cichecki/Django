'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Dodano stan ładowania

  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const userRole = localStorage.getItem('role');

    if (!accessToken || userRole !== '0') {
      window.location.href = '/login';
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false); // Zakończ ładowanie po sprawdzeniu autoryzacji
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white text-black text-3xl">
        Ładowanie...
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col text-black bg-white text-3xl justify-center items-center">
      {isAuthenticated ? (
        <div>
          <div className="w-full flex flex-row items-center justify-center gap-12">
            <Link
              href={'/user/laundry'}
              className="px-12 rounded-xl py-5 bg-gray-500 hover:bg-gray-700 text-white"
            >
              Pranie
            </Link>
            <Link
              href={'/user/reports'}
              className="px-12 rounded-xl py-5 bg-gray-500 hover:bg-gray-700 text-white"
            >
              Zgłoszenie
            </Link>
          </div>

          <div className="w-full h-fit flex flex-row items-center justify-center mt-9">
            <button
              onClick={() => handleLogout()}
              className="px-12 rounded-xl py-5 bg-gray-500 hover:bg-gray-700 text-white"
            >
              Wyloguj się
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Brak dostępu do strony</p>
        </div>
      )}
    </div>
  );
};

export default page;
