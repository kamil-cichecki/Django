'use client';
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const CreateUser = () => {
  const accessToken = localStorage.getItem('access');
  const decodedPayload = jwtDecode(accessToken);

  const dormitoryId = decodedPayload.dormitory_id_id;

  const [formData, setFormData] = useState({
    login: '',
    password: '',
    first_name: '',
    last_name: '',
    room_number: '',
    dormitory_id: dormitoryId,
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/users/create_user/', {
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
          login: '',
          password: '',
          first_name: '',
          last_name: '',
          room_number: '',
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
        Dodaj mieszkańca akademika
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-2 overflow-y-auto"
        style={{ maxHeight: 'calc(100% - 50px)' }} // Zachowanie miejsca na nagłówek i przyciski
        autoComplete="off"
      >
        <div className="flex flex-col">
          <label htmlFor="login" className="text-sm">
            Login:
          </label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className="border px-2 py-1 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm">
            Hasło:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="off"
            className="border px-2 py-1 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="first_name" className="text-sm">
            Imię:
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            autoComplete="off"
            className="border px-2 py-1 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="last_name" className="text-sm">
            Nazwisko:
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            autoComplete="off"
            className="border px-2 py-1 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="room_number" className="text-sm">
            Numer pokoju:
          </label>
          <input
            type="number"
            id="room_number"
            name="room_number"
            value={formData.room_number}
            onChange={handleChange}
            required
            autoComplete="off"
            className="border px-2 py-1 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-black text-white rounded"
        >
          Dodaj mieszkańca
        </button>
      </form>
      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default CreateUser;
