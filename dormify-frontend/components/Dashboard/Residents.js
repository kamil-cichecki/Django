'use client';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { deleteUser } from '@/lib/deleteUser';
import { Modal } from './Modal';
import { IoSearchOutline } from 'react-icons/io5';
import { acceptPayment } from '@/lib/acceptPayment';

const Residents = ({ dormitoryId }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const sortedUsers = [...users];
    if (sortConfig.key) {
      sortedUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setUsers(sortedUsers);
  }, [sortConfig]);

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
      }
    };

    fetchUsers();
  }, [dormitoryId]);

  const handleEdit = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedUser) => {
    try {
      const response = await fetch(
        `http://localhost:8000/users/edit/${editUser.id}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Zapisano zmiany:', data);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editUser.id ? { ...user, ...updatedUser } : user
        )
      );
    } catch (err) {
      console.error('Błąd zapisywania zmian:', err.message);
    }
  };

  const handleDelete = async (id) => {
    const deleteU = await deleteUser(id);
    alert('Użytkownik usunięty');
    return deleteU;
  };

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  const AcceptPayment = async (id) => {
    const deleteU = await acceptPayment(id);
    alert('Płatność zaakceptowana');
    return deleteU;
  };

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table
        id="table"
        className="min-w-full border-collapse border border-gray-500 text-gray-500 mt-9"
      >
        <thead className="bg-gray-800 text-white">
          <tr>
            <th
              onClick={() => sortData('id')}
              className="border border-gray-500 px-4 py-2 cursor-pointer"
            >
              ID
            </th>
            <th
              onClick={() => sortData('login')}
              className="border border-gray-500 px-4 py-2 cursor-pointer"
            >
              Login
            </th>
            <th
              onClick={() => sortData('first_name')}
              className="border border-gray-500 px-4 py-2 cursor-pointer"
            >
              Imię
            </th>
            <th
              onClick={() => sortData('last_name')}
              className="border border-gray-500 px-4 py-2 cursor-pointer"
            >
              Nazwisko
            </th>

            <th className="border border-gray-500 px-4 py-2">Akcja</th>
            <th className="border border-gray-500 px-4 py-2">
              Zaakceptuj płatność
            </th>
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
              <td className="border border-gray-500 px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Usuń
                </button>
              </td>
              <td className="border border-gray-500 px-4 py-2 space-x-2">
                <button
                  onClick={() => AcceptPayment(user.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Zaakceptuj
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        user={editUser}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Residents;
