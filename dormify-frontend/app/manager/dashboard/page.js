'use client';
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Dashboard() {
  const value = 0.66;
  return (
    <div className="h-full w-full bg-[#080414] text-white">
      <div className="flex flex-row">
        <div className="flex flex-col w-[15%] h-screen p-3">
          <div className="bg-[#383444] w-full h-full rounded-lg border border-gray-500"></div>
        </div>
        <div className="flex flex-row w-[85%] h-screen p-3">
          <div className="flex flex-wrap justify-center items-center gap-20 w-full h-[40%]">
            <div className="bg-[#383444] w-64 h-64 rounded-3xl p-4">
              <CircularProgressbar
                value={value}
                maxValue={1}
                text={`${value * 100}%`}
              />
            </div>
            <div className="bg-[#383444] w-64 h-64 rounded-3xl p-4">
              <CircularProgressbar
                value={value}
                maxValue={1}
                text={`${value * 100}%`}
              />
            </div>
            <div className="bg-[#383444] w-64 h-64 rounded-3xl p-4">
              <CircularProgressbar
                value={value}
                maxValue={1}
                text={`${value * 100}%`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
