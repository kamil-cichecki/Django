'use client';
import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { jwtDecode } from 'jwt-decode';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const userRole = localStorage.getItem('role');

    if (accessToken) {
      const decodedPayload = jwtDecode(accessToken);

      console.log(decodedPayload);
    }

    if (!accessToken || userRole !== '1') {
      window.location.href = '/manager';
    } else {
      setIsAuthenticated(true);
    }

    const fetchDom = async () => {};
  }, []);

  const value = 0.66;

  return (
    <div className="h-full w-full bg-[#080414] text-white">
      {isAuthenticated ? (
        <div className="flex flex-row">
          <div className="flex flex-col w-[15%] h-screen p-3">
            <div className="bg-[#383444] w-full h-full rounded-lg border border-gray-500"></div>
          </div>
          <div className="flex flex-row w-[85%] h-screen p-3">
            <div className="flex flex-wrap justify-center items-center gap-20 w-full h-[40%]">
              <div className="bg-[#383444] w-64 h-64 rounded-3xl p-4">
                <CircularProgressbar
                  value={value}
                  maxValue={1}
                  text={`${value * 100}%`}
                />
              </div>
              <div className="bg-[#383444] w-64 h-64 rounded-3xl p-4">
                <CircularProgressbar
                  value={value}
                  maxValue={1}
                  text={`${value * 100}%`}
                />
              </div>
              <div className="bg-[#383444] w-64 h-64 rounded-3xl p-4">
                <CircularProgressbar
                  value={value}
                  maxValue={1}
                  text={`${value * 100}%`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Brak dostępu do strony!</div>
      )}
    </div>
  );
}
