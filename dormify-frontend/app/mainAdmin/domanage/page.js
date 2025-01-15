'use client';
import React, { useEffect, useState } from 'react';
import { getDoms } from '@/lib/getDoms';

const Domanage = () => {
  const [doms, setDoms] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getDoms();
      setDoms(data);
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white">
      <div className="h-full w-full [background:#080414] p-4">
        <table className="w-full border-collapse border border-gray-700 text-white">
          <thead>
            <tr>
              <th className="border border-gray-700 p-2">Nazwa</th>
              <th className="border border-gray-700 p-2">Adres</th>
              <th className="border border-gray-700 p-2">Kierownik</th>
              <th className="border border-gray-700 p-2">Liczba mieszkańców</th>
              <th className="border border-gray-700 p-2">Liczba pokoi</th>
              <th className="border border-gray-700 p-2">
                Stan zaakceptowania
              </th>
              <th className="border border-gray-700 p-2">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {doms.map((domitory, index) => (
              <tr key={index}>
                <td className="border border-gray-700 p-2">{domitory.name}</td>
                <td className="border border-gray-700 p-2">
                  {domitory.address}
                </td>
                <td className="border border-gray-700 p-2">
                  {domitory.manager}
                </td>
                <td className="border border-gray-700 p-2">
                  {domitory.population}
                </td>
                <td className="border border-gray-700 p-2">
                  {domitory.room_count}
                </td>
                <td className="border border-gray-700 p-2">
                  {domitory.isAccepted ? 'Tak' : 'Nie'}
                </td>
                <td className="border border-gray-700 p-2">
                  {domitory.isAccepted ? (
                    <div>
                      <button className="text-red-800 w-full">Usuń</button>
                    </div>
                  ) : (
                    <div className="flex flex-row gap-2 justify-between">
                      <button className="bg-green-800 text-white rounded-lg w-[50%] p-2">
                        Akceptuj
                      </button>
                      <button className="bg-red-800 text-white rounded-lg w-[50%] p-2">
                        Odrzuć
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Domanage;
