'use client';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getOneDom } from '@/lib/getOneDom';
import MainDashboard from '@/components/Dashboard/MainDashboard';
import Sidenavbar from '@/components/Dashboard/Sidenavbar';
import Searchbar from '@/components/Dashboard/Searchbar';
import Residents from '@/components/Dashboard/Residents';
import Rooms from '@/components/Dashboard/Rooms';
import Reports from '@/components/Dashboard/Reports';
import Payments from '@/components/Dashboard/Payments';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dom, setDom] = useState([]);
  const [dormitory_id, setDormitory_id] = useState();
  const [selectedComponent, setSelectedComponent] = useState('home');

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
      setDormitory_id(decodedPayload.dormitory_id_id);
      setDom(data);
      console.log(data);
    };
    fetchDom();
  }, []);

  // Render the selected component based on the button clicked
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'home':
        return <MainDashboard />;
      case 'residents':
        return <Residents />;
      case 'rooms':
        return <Rooms dormitoryId={dormitory_id} />;
      case 'submissions':
        return <Reports dormitoryId={dormitory_id} />;
      case 'payments':
        return <Payments dormitoryId={dormitory_id} />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="h-full w-full bg-gray-300 text-white">
      {isAuthenticated ? (
        <div className="flex flex-row">
          <Sidenavbar setSelectedComponent={setSelectedComponent} />
          <div className="flex flex-col w-full h-screen p-3">
            <Searchbar />
            {renderSelectedComponent()}
          </div>
        </div>
      ) : (
        <div>Brak dostępu do strony!</div>
      )}
    </div>
  );
}
