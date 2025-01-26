export const acceptDom = async (dormitory_id) => {
  const response = await fetch(
    `http://127.0.0.1:8000/dormitories/${dormitory_id}/accept/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dormitory_id }),
    }
  );

  if (!response.ok) {
    throw new Error('Błąd aktualizacji akademika');
  }

  const data = await response.json();
  return data;
};
