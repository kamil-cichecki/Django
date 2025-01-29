'use client';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const LaundryReservationForm = () => {
  const [dormitoryId, setDormitoryId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/laundry/get/${dormitoryId}/`,
        { method: 'GET' }
      );
      const data = await response.json();

      if (response.ok) {
        setReservations(data.reservations);
      } else {
        setError(data.error || 'Nie udało się pobrać rezerwacji.');
      }
    } catch (err) {
      setError('Wystąpił błąd podczas pobierania rezerwacji.');
    }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    const reservationData = [
      {
        user_id: userId,
        reservation_start: `${selectedDate}T${timeRange.split('-')[0]}:00`,
        reservation_end: `${selectedDate}T${timeRange.split('-')[1]}:00`,
      },
    ];

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/laundry/save/${dormitoryId}/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reservationData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
        await fetchReservations(); // Odśwież rezerwacje po zapisaniu
      } else {
        setError(data.error || 'Nie udało się zapisać rezerwacji.');
      }
    } catch (err) {
      setError('Wystąpił błąd podczas zapisywania rezerwacji.');
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      window.location.href = '/login';
      return;
    }

    const decodedPayload = jwtDecode(accessToken);
    setDormitoryId(decodedPayload.dormitory_id_id);
    setUserId(decodedPayload.user_id);
  }, []);

  useEffect(() => {
    if (dormitoryId) {
      fetchReservations();
    }
  }, [dormitoryId]);

  const isTimeSlotReserved = (date, start, end) => {
    return reservations.some((reservation) => {
      const resStart = new Date(reservation.reservation_start);
      const resEnd = new Date(reservation.reservation_end);

      const selectedStart = new Date(`${date}T${start}`);
      const selectedEnd = new Date(`${date}T${end}`);

      return selectedStart < resEnd && selectedEnd > resStart;
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h1 className="text-xl font-bold mb-4">Rezerwacja prania</h1>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleReservationSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Wybierz dzień
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="timeRange"
          >
            Wybierz godzinę
          </label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value="" disabled>
              Wybierz zakres godzin
            </option>
            {[
              '08:00-10:00',
              '10:00-12:00',
              '12:00-14:00',
              '14:00-16:00',
              '16:00-18:00',
            ].map((range) => (
              <option
                key={range}
                value={range}
                disabled={
                  selectedDate &&
                  isTimeSlotReserved(selectedDate, ...range.split('-'))
                }
              >
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Zarezerwuj
          </button>
        </div>
      </form>
    </div>
  );
};

export default LaundryReservationForm;
