'use client';
import React, { useState, useEffect } from 'react';
import { getPayments } from '@/lib/getPayments';
import { removePayments } from '@/lib/removePayments';

const Payments = ({ dormitoryId }) => {
  const [payments, setPayments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/payments/${dormitoryId}/`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) {
          throw new Error('Błąd podczas pobierania płatności.');
        }

        const data = await response.json();
        console.log(data.payments); // Log dla debugowania
        setPayments(data.payments || []); // Ustawienie danych płatności
      } catch (error) {
        console.error('Błąd podczas zapytania do API:', error);
      }
    };

    fetchPayments();
  }, [dormitoryId]);

  // Funkcja sortowania
  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedPayments = [...payments].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setPayments(sortedPayments);
  };

  const handlePayments = async () => {
    try {
      const result = await removePayments(dormitoryId);

      if (!result.ok) {
        throw new Error('Błąd podczas resetowania płatności.');
      }

      alert('Płatności zostały zresetowane!');
      setPayments([]); // Resetuje stan płatności lokalnie
    } catch (error) {
      console.error('Błąd podczas resetowania płatności:', error);
      alert('Nie udało się zresetować płatności.');
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="w-full flex flex-col items-center mt-9">
        <button
          onClick={handlePayments}
          className="bg-gray-700 text-white rounded-lg px-5 py-2 text-xl text-center hover:bg-gray-600"
        >
          Resetuj płatności
        </button>
      </div>

      <table
        id="table"
        className="min-w-full border-collapse border border-gray-500 text-gray-500 mt-9"
      >
        <thead className="bg-gray-800 text-white">
          <tr>
            <th
              onClick={() => sortData('payment_id')}
              className="border border-gray-500 px-4 py-2 cursor-pointer"
            >
              ID Płatności{' '}
              {sortConfig.key === 'payment_id' &&
                (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th
              onClick={() => sortData('user_id')}
              className="border border-gray-500 px-4 py-2 cursor-pointer"
            >
              ID Użytkownika{' '}
              {sortConfig.key === 'user_id' &&
                (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th
              onClick={() => sortData('amount')}
              className="border border-gray-500 px-4 py-2 cursor-pointer"
            >
              Kwota{' '}
              {sortConfig.key === 'amount' &&
                (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th
              onClick={() => sortData('status')}
              className="border border-gray-500 px-4 py-2 cursor-pointer"
            >
              Status{' '}
              {sortConfig.key === 'status' &&
                (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th
              onClick={() => sortData('date_payment')}
              className="border border-gray-500 px-4 py-2 cursor-pointer"
            >
              Data Płatności{' '}
              {sortConfig.key === 'date_payment' &&
                (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr
              key={payment.payment_id}
              className={`text-center ${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              <td className="border border-gray-500 px-4 py-2">
                {payment.payment_id}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {payment.user_id}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {payment.amount} zł
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {payment.status ? 'Opłacone' : 'Nieopłacone'}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {payment.date_payment}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
