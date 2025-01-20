'use client';
import React, { useState, useEffect } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { jwtDecode } from 'jwt-decode';
import { getOneDom } from '@/lib/getOneDom';

import Sidenavbar from '@/components/Dashboard/Sidenavbar';
import Searchbar from '@/components/Dashboard/Searchbar';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dom, setDom] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

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

  const value = 0.66;

  return (
    <div className="h-full w-full bg-gray-300 text-white">
      {isAuthenticated ? (
        <div className="flex flex-row">
          <Sidenavbar />
          <div className="flex flex-col w-full h-screen p-3">
            <Searchbar />
            <div className="flex flex-row w-full h-full p-3">
              <div className="flex flex-wrap justify-center items-center gap-20 w-full h-[40%]">
                <div className="bg-white w-64 h-64 rounded-3xl p-4">
                  <CircularProgressbar
                    value={value}
                    maxValue={1}
                    text={`${value * 100}%`}
                    className=""
                    styles={buildStyles({
                      pathColor: '#080414',
                      textColor: '#080414',
                    })}
                  />
                </div>
                <div className="bg-white w-64 h-64 rounded-3xl p-4">
                  <CircularProgressbar
                    value={value}
                    maxValue={1}
                    text={`${value * 100}%`}
                    className=""
                    styles={buildStyles({
                      pathColor: '#080414',
                      textColor: '#080414',
                    })}
                  />
                </div>
                <div className="bg-white w-64 h-64 rounded-3xl p-4">
                  <CircularProgressbar
                    value={value}
                    maxValue={1}
                    text={`${value * 100}%`}
                    className=""
                    styles={buildStyles({
                      pathColor: '#080414',
                      textColor: '#080414',
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Brak dostępu do strony!</div>
      )}
    </div>
  );
}
