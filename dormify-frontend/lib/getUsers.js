export const getUsers = async () => {
  const response = await fetch('http://127.0.0.1:8000/users/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  return data;
};
