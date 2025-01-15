export const registerDom = async (
  name,
  street,
  streetNumber,
  pCode,
  city,
  manager
) => {
  const address = `${streetNumber} ${street}, ${pCode}, ${city}`;

  const response = await fetch('http://127.0.0.1:8000/register_dormitory/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, address, manager }),
  });

  if (!response.ok) {
    throw new Error('Failed to register the building. Please try again.');
  }

  const data = await response.json();
  return data;
};
