'use client';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const LatestRooms = () => {
  const accessToken = localStorage.getItem('access');
  const decodedPayload = jwtDecode(accessToken);

  const dormitoryId = decodedPayload.dormitory_id_id;

  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setError(null);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/rooms/getlatest/${dormitoryId}/`
        );
        if (!response.ok) {
          throw new Error('Błąd podczas pobierania danych.');
        }
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError(err.message || 'Nie można połączyć się z serwerem.');
      }
    };

    fetchRooms();
  }, [dormitoryId]);

  return (
    <div className="w-[40%] h-96 bg-white rounded-lg flex flex-col text-black p-4">
      <h1 className="text-center font-semibold text-xl mb-4">
        3 ostatnio dodane pokoje
      </h1>
      <div
        className="flex flex-col gap-2 overflow-y-auto"
        style={{ maxHeight: 'calc(100% - 50px)' }}
      >
        {error && <p className="text-red-600">{error}</p>}
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room.id}
              className="border p-2 rounded shadow-sm bg-gray-100"
            >
              <p>
                <strong>Numer pokoju:</strong> {room.room_id}
              </p>
              <p>
                <strong>Pojemność:</strong> {room.capacity}
              </p>
              <p>
                <strong>Liczba lokatorów:</strong> {room.tenant_count}
              </p>
              <p>
                <strong>Typ:</strong> {room.type}
              </p>
              <p>
                <strong>Piętro:</strong> {room.floor}
              </p>
              <p>
                <strong>Czynsz:</strong> {room.rent_cost} zł
              </p>
            </div>
          ))
        ) : (
          <p>Brak danych do wyświetlenia.</p>
        )}
      </div>
    </div>
  );
};

export default LatestRooms;
