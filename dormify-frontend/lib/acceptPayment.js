export const acceptPayment = async (id) => {
  const response = await fetch(`http://127.0.0.1:8000/payments/accept/${id}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  return data;
};
