export const getPayments = async (id) => {
  const response = await fetch(`http://127.0.0.1:8000/payments/${id}/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  return data;
};
