import React from 'react';
import CircularPopulation from './CircularPopulation';
import CreateUser from './createUser';

const MainDashboard = () => {
  return (
    <div className="flex flex-row w-full h-full p-3 relative">
      <div className="w-full">
        <CircularPopulation />
        <div className="flex flex-row  gap-5">
          <CreateUser />
          <CreateUser />
        </div>
        <div className="mt-5 flex flex-row gap-5 ">
          <CreateUser />
          <CreateUser />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
