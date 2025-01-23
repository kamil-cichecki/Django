'use client';
import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { MdModeEditOutline } from 'react-icons/md';
import { deleteRoom } from '@/lib/deleteRoom';
const Rooms = ({ dormitoryId }) => {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/rooms/status/${dormitoryId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRooms(data.rooms);
        console.log(data.rooms);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRooms();
  }, [dormitoryId]);

  const openModal = (room) => {
    setCurrentRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentRoom(null);
    setIsModalOpen(false);
  };

  const handleEditRoom = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/rooms/edit/${currentRoom.room_id}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            room_number: currentRoom.room_number,
            floor: currentRoom.floor,
            capacity: currentRoom.capacity,
            type: currentRoom.room_type,
            rent_cost: currentRoom.rent_cost,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedRoom = await response.json();

      // Aktualizacja stanu pokoju w tabeli
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.room_id === updatedRoom.room_id ? updatedRoom : room
        )
      );

      closeModal();
    } catch (err) {
      console.error('Error updating room:', err);
    }
  };

  const sortRooms = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedRooms = [...rooms].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setRooms(sortedRooms);
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  const handleDelete = async (id) => {
    console.log(id);
    const deleteU = await deleteRoom(id);
    alert('Pokój usunięty');
    return deleteU;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border mt-7 border-gray-500 text-gray-500">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th
              className="border border-gray-500 px-4 py-2 cursor-pointer"
              onClick={() => sortRooms('room_number')}
            >
              Numer pokoju{getSortIndicator('room_number')}
            </th>
            <th
              className="border border-gray-500 px-4 py-2 cursor-pointer"
              onClick={() => sortRooms('floor')}
            >
              Piętro{getSortIndicator('floor')}
            </th>
            <th
              className="border border-gray-500 px-4 py-2 cursor-pointer"
              onClick={() => sortRooms('room_type')}
            >
              Typ{getSortIndicator('room_type')}
            </th>
            <th
              className="border border-gray-500 px-4 py-2 cursor-pointer"
              onClick={() => sortRooms('capacity')}
            >
              Pojemność{getSortIndicator('capacity')}
            </th>
            <th
              className="border border-gray-500 px-4 py-2 cursor-pointer"
              onClick={() => sortRooms('rent_cost')}
            >
              Koszt wynajmu{getSortIndicator('rent_cost')}
            </th>
            <th className="border border-gray-500 px-4 py-2">Akcja</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr
              key={room.room_id}
              className={`text-center ${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              <td className="border border-gray-500 px-4 py-2">
                {room.room_number}
              </td>
              <td className="border border-gray-500 px-4 py-2">{room.floor}</td>
              <td className="border border-gray-500 px-4 py-2">
                {room.room_type}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {room.capacity}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {room.rent_cost} PLN
              </td>
              <td className="border border-gray-500 px-4 py-2 flex flex-row items-center justify-center gap-2">
                <button
                  onClick={() => openModal(room)}
                  className="bg-[#202c34] text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  <MdModeEditOutline className="h-6 w-6" />
                </button>
                <button
                  onClick={() => handleDelete(room.room_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  <MdDeleteForever className="text-3xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex text-black items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edytuj pokój</h2>
            <form onSubmit={handleEditRoom}>
              <div className="mb-4">
                <label className="block text-gray-700">Numer pokoju:</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={currentRoom.room_number}
                  onChange={(e) =>
                    setCurrentRoom({
                      ...currentRoom,
                      room_number: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Piętro:</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={currentRoom.floor}
                  onChange={(e) =>
                    setCurrentRoom({ ...currentRoom, floor: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Typ:</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={currentRoom.room_type}
                  onChange={(e) =>
                    setCurrentRoom({
                      ...currentRoom,
                      room_type: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Pojemność:</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={currentRoom.capacity}
                  onChange={(e) =>
                    setCurrentRoom({ ...currentRoom, capacity: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Koszt wynajmu:</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={currentRoom.rent_cost}
                  onChange={(e) =>
                    setCurrentRoom({
                      ...currentRoom,
                      rent_cost: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Zapisz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
