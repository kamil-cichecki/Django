'use client';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const ShowLatestUsers = () => {
  const [latestUsers, setLatestUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestUsers = async () => {
      try {
        const accessToken = localStorage.getItem('access');
        const decodedPayload = jwtDecode(accessToken);
        const dormitoryId = decodedPayload.dormitory_id_id;

        const response = await fetch(
          `http://127.0.0.1:8000/users/getlatestusers/${dormitoryId}`
        );
        if (!response.ok) {
          throw new Error('Nie udało się pobrać danych użytkowników.');
        }

        const data = await response.json();
        setLatestUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLatestUsers();
  }, []);

  return (
    <div className="w-[40%] h-96 bg-white rounded-lg flex flex-col items-center text-black p-4 overflow-y-auto">
      <h1 className="text-center font-semibold text-xl mb-4">
        Ostatni użytkownicy
      </h1>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : latestUsers.length > 0 ? (
        <ul className="w-full">
          {latestUsers.map((user) => (
            <li
              key={user.id}
              className="flex flex-col border-b py-2 text-sm last:border-none"
            >
              <p>
                <strong>Login:</strong> {user.login}
              </p>
              <p>
                <strong>Imię:</strong> {user.first_name}
              </p>
              <p>
                <strong>Nazwisko:</strong> {user.last_name}
              </p>
              <p>
                <strong>Numer pokoju:</strong> {user.room_number}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Brak użytkowników do wyświetlenia.</p>
      )}
    </div>
  );
};

export default ShowLatestUsers;
