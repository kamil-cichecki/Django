'use client';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { deleteUser } from '@/lib/deleteUser';
import { Modal } from './Modal';

const Residents = ({ dormitoryId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <>
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </>
    );
  }

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
