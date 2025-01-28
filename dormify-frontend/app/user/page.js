'use client';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const LaundryScheduler = () => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [userId, setUser_id] = useState();
  const [dormitory_id, setDormitory_id] = useState();
  const startHour = 8;
  const endHour = 22;

  useEffect(() => {
    const accessToken = localStorage.getItem('access');

    if (accessToken) {
      const decodedPayload = jwtDecode(accessToken);

      const dormitory_id = decodedPayload.dormitory_id_id;
      const user_id = decodedPayload.user_id;

      setDormitory_id(dormitory_id);
      setUser_id(user_id);
    }
  }, []);

  // Generuj godziny w pionie
  const generateHours = () => {
    const hours = [];
    for (let i = startHour; i <= endHour; i++) {
      const formattedHour = i < 10 ? `0${i}:00` : `${i}:00`;
      hours.push(formattedHour);
    }
    return hours;
  };

  // Generuj dni tygodnia (od dzisiaj + 7)
  const generateDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
    }
    return days;
  };

  const hours = generateHours();
  const days = generateDays();

  // Pobierz zarezerwowane sloty
  useEffect(() => {
    const fetchReservedSlots = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/laundry/get/${dormitory_id}/`
        );
        if (response.ok) {
          const data = await response.json();
          const reservations = data.reservations || [];

          const slots = reservations.map((reservation) => {
            const start = new Date(reservation.reservation_start);
            const end = new Date(reservation.reservation_end);

            return {
              day: start.toISOString().split('T')[0],
              hour: start.toISOString().split('T')[1].slice(0, 5), // Format HH:MM
            };
          });

          setSelectedSlots(slots);
        } else {
          console.error('Błąd podczas pobierania rezerwacji');
        }
      } catch (error) {
        console.error('Błąd podczas zapytania do API:', error);
      }
    };

    if (dormitory_id) {
      fetchReservedSlots();
    }
  }, [dormitory_id]);

  // Obsługa wyboru slotu
  const handleSlotClick = (day, hour) => {
    const slot = { day, hour };

    // Sprawdź, czy slot jest już zaznaczony
    const isSelected = selectedSlots.some(
      (selected) => selected.day === day && selected.hour === hour
    );

    if (isSelected) {
      // Jeśli slot jest zaznaczony, usuń go
      setSelectedSlots((prevSlots) =>
        prevSlots.filter((s) => !(s.day === day && s.hour === hour))
      );
    } else {
      // Jeśli slot nie jest zaznaczony, dodaj go
      setSelectedSlots((prevSlots) => {
        // Sprawdzamy, czy nie ma już tego slotu
        if (!prevSlots.some((s) => s.day === day && s.hour === hour)) {
          return [...prevSlots, slot];
        }
        return prevSlots;
      });
    }
  };

  // Wysyłanie danych do bazy
  const handleSubmit = async () => {
    const formattedReservations = selectedSlots.map((slot) => {
      const start = new Date(`${slot.day}T${slot.hour}`);
      const end = new Date(start);
      end.setHours(end.getHours() + 1); // Załóżmy, że pranie trwa godzinę
      return {
        user_id: userId,
        reservation_start: start.toISOString(),
        reservation_end: end.toISOString(),
      };
    });

    try {
      const response = await fetch(
        `http://localhost:8000/laundry/save/${dormitory_id}/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedReservations),
        }
      );

      if (!response.ok) {
        throw new Error('Nie udało się zapisać rezerwacji.');
      }

      alert('Rezerwacje zostały zapisane!');
    } catch (error) {
      console.error(error);
      alert('Wystąpił błąd podczas zapisywania rezerwacji.');
    }
  };

  return (
    <div className="p-4 text-white">
      <table className="min-w-full border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">Godziny</th>
            {days.map((day) => (
              <th key={day} className="border border-gray-500 px-4 py-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className="border border-gray-500 px-4 py-2">{hour}</td>
              {days.map((day) => (
                <td
                  key={`${day}-${hour}`}
                  className={`border border-gray-500 px-4 py-2 cursor-pointer ${
                    selectedSlots.find(
                      (slot) => slot.day === day && slot.hour === hour
                    )
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                  }`}
                  onClick={() => handleSlotClick(day, hour)}
                >
                  {selectedSlots.find(
                    (slot) => slot.day === day && slot.hour === hour
                  )
                    ? '✓'
                    : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Zapisz rezerwacje
      </button>
    </div>
  );
};

export default LaundryScheduler;
