export const removePayments = async (dormitory_id) => {
  const response = await fetch(
    `http://127.0.0.1:8000/users/resetpaymentstatus/${dormitory_id}/`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!response.ok) {
    throw new Error('Błąd usuwania akademika');
  }

  const data = await response.json();
  return data;
};
