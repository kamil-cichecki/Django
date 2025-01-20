'use client';
import React, { useState } from 'react';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    first_name: '',
    last_name: '',
    room_id: '',
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
      const response = await fetch('/users/create_user', {
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
          room_id: '',
        });
      } else {
        setError(result.error || 'Wystąpił błąd podczas przetwarzania.');
      }
    } catch (err) {
      setError('Nie można połączyć się z serwerem.');
    }
  };

  return (
    <div className="w-[40%] h-96 bg-white rounded-lg flex flex-col items-center text-black">
      <h1 className="text-center font-semibold ">Dodaj mieszkańca akademika</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[40%] mt-9 gap-3"
        autoComplete="off"
      >
        <div className="flex flex-row justify-between">
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className="border-b-[1px] border-black rounded-lg "
          />
        </div>
        <div className="flex flex-row justify-between">
          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="off"
            className="border-b-[1px] border-black rounded-lg "
          />
        </div>
        <div className="flex flex-row justify-between">
          <label htmlFor="first_name">Imię:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            autoComplete="off"
            className="border-b-[1px] border-black rounded-lg "
          />
        </div>
        <div className="flex flex-row justify-between">
          <label htmlFor="last_name">Nazwisko:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            autoComplete="off"
            className="border-b-[1px] border-black rounded-lg "
          />
        </div>
        <div className="flex flex-row justify-between">
          <label htmlFor="room_id">ID pokoju:</label>
          <input
            type="number"
            id="room_id"
            name="room_id"
            value={formData.room_id}
            onChange={handleChange}
            required
            autoComplete="off"
            className="border-b-[1px] border-black rounded-lg "
          />
        </div>
        <button
          type="submit"
          className="mt-6 px-2 py-1 bg-black rounded-lg text-white"
        >
          Dodaj mieszkańca
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateUser;
