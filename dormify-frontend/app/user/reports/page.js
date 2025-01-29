'use client';
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';

const ReportForm = ({}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState('');
  const [reportType, setReportType] = useState('naprawa');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [dormitoryid, setDormitoryid] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState('true');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reportData = {
      dormitory_id: dormitoryid,
      user_id: userId,
      title,
      type: reportType,
      content,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/reports/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError('');
        setTitle('');
        setReportType('naprawa');
        setContent('');
      } else {
        setError(data.error || 'Wystąpił błąd.');
        setMessage('');
      }
    } catch (error) {
      setError('Nie udało się wysłać zgłoszenia.');
      setMessage('');
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const userRole = localStorage.getItem('role');

    if (!accessToken || userRole !== '0') {
      window.location.href = '/login';
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
    const fetchDom = async () => {
      const decodedPayload = jwtDecode(accessToken);

      setDormitoryid(decodedPayload.dormitory_id_id);
      setUserId(decodedPayload.user_id);
    };
    fetchDom();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h1 className="text-xl font-bold mb-4">Utwórz zgłoszenie</h1>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Tytuł zgłoszenia
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Typ zgłoszenia
          </label>
          <select
            id="type"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="naprawa">Naprawa</option>
            <option value="czyszczenie">Czyszczenie</option>
            <option value="inne">Inne</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Treść zgłoszenia
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Wyślij zgłoszenie
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
