import React from 'react';
import CircularPopulation from './CircularPopulation';
import CreateUser from './CreateUser';
import CreateRoom from './CreateRoom';
import LatestRooms from './GetLatestRooms';
import ShowLatestUsers from './ShowLatestUsers';

const MainDashboard = () => {
  return (
    <div className="flex flex-row w-full h-full p-3 relative">
      <div className="w-full">
        <CircularPopulation />
        <div className="flex flex-row  gap-5">
          <CreateUser />
          <CreateRoom />
        </div>
        <div className="mt-5 flex flex-row gap-5 ">
          <LatestRooms />
          <ShowLatestUsers />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
