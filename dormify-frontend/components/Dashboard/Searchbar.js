import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosSettings } from 'react-icons/io';

const Searchbar = () => {
  return (
    <div className="flex flex-row w-full h-[7%] rounded-lg items-center justify-between p-4 bg-white">
      <div className="bg-gray-200 w-64 h-9 rounded-lg flex flex-row items-center p-2">
        <IoSearchOutline className="text-black " />
        <form className="flex flex-row text-center p-1 ">
          <input
            type="text"
            placeholder="Szukaj..."
            className="bg-gray-200 outline-none text-black"
          ></input>
        </form>
      </div>
      <div className="w-9 h-9 bg-[#080414] rounded-lg">
        <IoIosSettings className="text-4xl text-gray-100" />
      </div>
    </div>
  );
};

export default Searchbar;
