'use client';
import { useState } from 'react';

export default function Home() {
  const [state, setState] = useState('');

  const getApi = async () => {
    const url = 'http://127.0.0.1:8000/api/add?a=1&b=3';
    const data = await fetch(url);
    const response = await data.json();
    console.log(response);
    setState(response);
  };

  const handleClick = async () => {
    await getApi();
  };

  return (
    <div>
      <button onClick={handleClick}>Get data</button>
      <p>{state.result}</p>
    </div>
  );
}
