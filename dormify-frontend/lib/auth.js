export const loginUser = async (email, password) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Wprowadzono błędne dane!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Logowanie nie powiodło się!', error);
    throw error;
  }
};
