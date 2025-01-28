'use client';
import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { deleteReport } from '@/lib/deleteReport';
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosSettings } from 'react-icons/io';

const Reports = ({ dormitoryId }) => {
  const [reports, setReports] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/reports/dormitory/${dormitoryId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReports(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReports();
  }, [dormitoryId]);

  const handleDelete = async (id) => {
    const deleteU = await deleteReport(id);
    alert('Zgłoszenie wykonane!');
    return deleteU;
  };

  const sortReports = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedReports = [...reports].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setReports(sortedReports);
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border mt-7 border-gray-500 text-gray-500">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th
              className="border border-gray-500 px-4 py-2 cursor-pointer"
              onClick={() => sortReports('id')}
            >
              ID{getSortIndicator('id')}
            </th>
            <th
              className="border border-gray-500 px-4 py-2 cursor-pointer"
              onClick={() => sortReports('user_id')}
            >
              ID Użytkownika{getSortIndicator('user_id')}
            </th>
            <th
              className="border border-gray-500 px-4 py-2 cursor-pointer"
              onClick={() => sortReports('status')}
            >
              Status{getSortIndicator('status')}
            </th>
            <th
              className="border border-gray-500 px-4 py-2 cursor-pointer"
              onClick={() => sortReports('title')}
            >
              Tytuł{getSortIndicator('title')}
            </th>
            <th
              className="border border-gray-500 px-4 py-2 cursor-pointer"
              onClick={() => sortReports('type')}
            >
              Typ{getSortIndicator('type')}
            </th>
            <th
              className="border border-gray-500 px-4 py-2 cursor-pointer"
              onClick={() => sortReports('date')}
            >
              Data{getSortIndicator('date')}
            </th>
            <th className="border border-gray-500 px-4 py-2">Treść</th>
            <th className="border border-gray-500 px-4 py-2">Akcja</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr
              key={report.id}
              className={`text-center ${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              <td className="border border-gray-500 px-4 py-2">{report.id}</td>
              <td className="border border-gray-500 px-4 py-2">
                {report.user_id}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {report.status}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {report.title}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {report.type}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {report.date}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {report.content}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                <button
                  onClick={() => handleDelete(report.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  <FaCheck />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
