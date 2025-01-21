'use client';
import React, { useState, useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';
import { getOneDom } from '@/lib/getOneDom';
import MainDashboard from '@/components/Dashboard/MainDashboard';
import Sidenavbar from '@/components/Dashboard/Sidenavbar';
import Searchbar from '@/components/Dashboard/Searchbar';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dom, setDom] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const userRole = localStorage.getItem('role');

    if (!accessToken || userRole !== '1') {
      window.location.href = '/manager';
    } else {
      setIsAuthenticated(true);
    }

    const fetchDom = async () => {
      const decodedPayload = jwtDecode(accessToken);

      const data = await getOneDom(decodedPayload.dormitory_id_id);
      setDom(data);
      console.log(data);
    };
    fetchDom();
  }, []);

  return (
    <div className="h-full w-full bg-gray-300 text-white">
      {isAuthenticated ? (
        <div className="flex flex-row">
          <Sidenavbar />
          <div className="flex flex-col w-full h-screen p-3">
            <Searchbar />
            <MainDashboard />
          </div>
        </div>
      ) : (
        <div>Brak dostępu do strony!</div>
      )}
    </div>
  );
}
