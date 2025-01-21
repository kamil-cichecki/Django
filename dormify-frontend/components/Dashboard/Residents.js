'use client';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const Residents = ({ dormitoryId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const decodedPayload = jwtDecode(accessToken);

    const dormitoryId = decodedPayload.dormitory_id_id;

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/users/all/${dormitoryId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dormitoryId]);

  if (loading) {
    return <div>Ładowanie danych...</div>;
  }

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-500 text-gray-500">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="border border-gray-500 px-4 py-2">ID</th>
            <th className="border border-gray-500 px-4 py-2">Login</th>
            <th className="border border-gray-500 px-4 py-2">Imię</th>
            <th className="border border-gray-500 px-4 py-2">Nazwisko</th>
            <th className="border border-gray-500 px-4 py-2">Rola</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`text-center ${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              <td className="border border-gray-500 px-4 py-2">{user.id}</td>
              <td className="border border-gray-500 px-4 py-2">{user.login}</td>
              <td className="border border-gray-500 px-4 py-2">
                {user.first_name}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {user.last_name}
              </td>
              <td className="border border-gray-500 px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Residents;
