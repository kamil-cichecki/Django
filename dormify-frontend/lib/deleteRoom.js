export const deleteRoom = async (id) => {
  const response = await fetch(`http://127.0.0.1:8000/rooms/delete/${id}/`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  return data;
};
