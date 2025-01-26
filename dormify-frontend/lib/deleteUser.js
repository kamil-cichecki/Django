export const deleteUser = async (id) => {
  const response = await fetch(`http://127.0.0.1:8000/users/delete/${id}/`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  return data;
};
