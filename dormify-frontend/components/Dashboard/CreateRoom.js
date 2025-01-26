'use client';
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const CreateRoom = () => {
  const accessToken = localStorage.getItem('access');
  const decodedPayload = jwtDecode(accessToken);

  const dormitoryId = decodedPayload.dormitory_id_id;

  const [formData, setFormData] = useState({
    room_number: '',
    capacity: 1, // Domyślna wartość dla Jednoosobowego
    tenant_count: 0,
    type: 'Jednoosobowy', // Domyślna wartość
    floor: '',
    rent_cost: '',
    dormitory_id: dormitoryId,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      // Aktualizuj capacity na podstawie wybranego typu
      if (name === 'type') {
        const capacityMap = {
          Jednoosobowy: 1,
          Dwuosobowy: 2,
          Trzyosobowy: 3,
        };
        updatedFormData.capacity = capacityMap[value] || 1; // Domyślnie 1
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/rooms/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setFormData({
          room_number: '',
          capacity: 1,
          tenant_count: 0,
          type: 'Jednoosobowy',
          floor: '',
          rent_cost: '',
          dormitory_id: dormitoryId,
        });
      } else {
        setError(result.error || 'Wystąpił błąd podczas przetwarzania.');
      }
    } catch (err) {
      setError('Nie można połączyć się z serwerem.');
    }
  };

  return (
    <div className="w-[40%] h-96 bg-white rounded-lg flex flex-col items-center text-black p-4">
      <h1 className="text-center font-semibold text-xl mb-2">
        Dodaj nowy pokój
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-2 overflow-y-auto"
        style={{ maxHeight: 'calc(100% - 50px)' }} // Zachowanie miejsca na nagłówek
        autoComplete="off"
      >
        <div className="flex flex-col">
          <label htmlFor="room_number" className="text-sm">
            Numer pokoju:
          </label>
          <input
            type="text"
            id="room_number"
            name="room_number"
            value={formData.room_number}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="type" className="text-sm">
            Typ pokoju:
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded"
          >
            <option value="Jednoosobowy">Jednoosobowy</option>
            <option value="Dwuosobowy">Dwuosobowy</option>
            <option value="Trzyosobowy">Trzyosobowy</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="capacity" className="text-sm">
            Pojemność:
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            readOnly
            className="border px-2 py-1 rounded bg-gray-200"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="floor" className="text-sm">
            Piętro:
          </label>
          <input
            type="number"
            id="floor"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded"
            max={10}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rent_cost" className="text-sm">
            Koszt wynajmu:
          </label>
          <input
            type="number"
            id="rent_cost"
            name="rent_cost"
            value={formData.rent_cost}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-black text-white rounded"
        >
          Dodaj pokój
        </button>
      </form>
      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default CreateRoom;
