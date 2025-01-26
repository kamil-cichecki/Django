export const loginUser = async (login, password) => {
  const response = await fetch('http://127.0.0.1:8000/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const data = await response.json();
  return data;
};
