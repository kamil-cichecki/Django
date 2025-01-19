'use client';
import React, { useEffect, useState } from 'react';
import { getDoms } from '@/lib/getDoms';
import { removeDom } from '@/lib/removeDom';
import { acceptDom } from '@/lib/acceptDom';
import { getUsers } from '@/lib/getUsers';
import { assignDtoM } from '@/lib/assignDtoM';

const Domanage = () => {
  const [doms, setDoms] = useState([]);
  const [getallusers, setUsers] = useState([]);
  const [selectedDormitory, setSelectedDormitory] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const getData = async () => {
      const data = await getDoms();
      setDoms(data);
    };
    const getAllUsers = async () => {
      const allUsers = await getUsers();
      setUsers(allUsers.users);
      console.log(allUsers.users);
    };
    getData();
    getAllUsers();
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
    <div className="[background:#080414] h-full">
      <div className="w-full h-[70%] flex flex-col items-center justify-center text-white">
        <div className="h-full w-full  p-4">
          <table className="w-full border-collapse border border-gray-700 text-white">
            <thead>
              <tr>
                <th className="border border-gray-700 p-2">Nazwa</th>
                <th className="border border-gray-700 p-2">Adres</th>
                <th className="border border-gray-700 p-2">Kierownik</th>
                <th className="border border-gray-700 p-2">
                  Liczba mieszkańców
                </th>
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
                  <td className="border border-gray-700 p-2">
                    {domitory.name}
                  </td>
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
      <div className="h-fit w-full">
        <h1 className="text-white font-bold text-2xl text-center">
          Przypisz menadżera
        </h1>
      </div>
      <div className="flex flex-row gap-2">
        <select
          value={selectedDormitory}
          onChange={(e) => setSelectedDormitory(e.target.value)}
        >
          <option value="">Wybierz akademik</option>
          {doms.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Wybierz użytkownika</option>
          {getallusers.map((item) => (
            <option key={item.id} value={item.id}>
              {item.first_name + ' ' + item.last_name}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            if (selectedDormitory && selectedUser) {
              assignDtoM(selectedDormitory, selectedUser);
            } else {
              alert('Wybierz akademik i użytkownika');
            }
          }}
          className="bg-blue-600 text-white rounded-lg p-2"
        >
          Przypisz
        </button>
      </div>
    </div>
  );
};

export default Domanage;
