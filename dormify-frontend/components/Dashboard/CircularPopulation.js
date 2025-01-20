import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularPopulation = () => {
  const value = 0.66;
  return (
    <div className="bg-white w-64 h-64 rounded-3xl p-4 absolute bottom-0 right-0">
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
  );
};

export default CircularPopulation;
