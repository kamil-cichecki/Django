'use client';
import React, { useEffect, useState } from 'react';
import { getDoms } from '@/lib/getDoms';
import { removeDom } from '@/lib/removeDom';
import { acceptDom } from '@/lib/acceptDom';

const Domanage = () => {
  const [doms, setDoms] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDoms();
        setDoms(data);
      } catch (error) {
        console.error('Error fetching dormitories:', error);
      }
    };
    getData();
  }, []);

  // Handle delete action
  const deleteDom = async (dormitory_id) => {
    try {
      await removeDom(dormitory_id);
      setDoms((prevDoms) => prevDoms.filter((dom) => dom.id !== dormitory_id));
    } catch (error) {
      console.error('Error deleting dormitory:', error);
    }
  };

  const acceptdom = async (dormitory_id) => {
    try {
      await acceptDom(dormitory_id);
      setDoms((prevDoms) => prevDoms.filter((dom) => dom.id !== dormitory_id));
    } catch (error) {
      console.error('Error Updating dormitory:', error);
    }
  };

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
            {doms.map((domitory) => (
              <tr key={domitory.id}>
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
                    <button
                      onClick={() => deleteDom(domitory.id)}
                      className="text-red-800 w-full"
                    >
                      Usuń
                    </button>
                  ) : (
                    <div className="flex flex-row gap-2 justify-between">
                      <button
                        onClick={() => acceptdom(domitory.id)}
                        className="bg-green-800 text-white rounded-lg w-[50%] p-2"
                      >
                        Akceptuj
                      </button>
                      <button
                        onClick={() => deleteDom(domitory.id)}
                        className="bg-red-800 text-white rounded-lg w-[50%] p-2"
                      >
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
