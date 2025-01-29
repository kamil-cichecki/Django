import React, { useState, useEffect } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { jwtDecode } from 'jwt-decode';

const CircularPopulation = () => {
  const [value, setValue] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOccupancy = async () => {
      const accessToken = localStorage.getItem('access');
      const decodedPayload = jwtDecode(accessToken);
      const dormitoryId = decodedPayload.dormitory_id_id;
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/dormitories/occupancy/${dormitoryId}/`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch dormitory occupancy.');
        }
        const data = await response.json();
        setValue(data.occupancy_rate);
        console.log(data.occupancy_rate);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOccupancy();
  }, []);

  return (
    <div className="bg-white w-64 h-64 rounded-3xl p-4 absolute bottom-0 right-0">
      <CircularProgressbar
        value={value / 100}
        maxValue={1}
        text={`${value} %`}
        styles={buildStyles({
          pathColor: '#080414',
          textColor: '#080414',
        })}
      />
    </div>
  );
};

export default CircularPopulation;
