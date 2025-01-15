export const getDoms = async () => {
  const response = await fetch('http://127.0.0.1:8000/allDormitories/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  console.log(data);
  return data;
};
