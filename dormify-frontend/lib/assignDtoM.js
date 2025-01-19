export const assignDtoM = async (dormitoryId, userId) => {
  try {
    const response = await fetch(
      'http://127.0.0.1:8000/users/assign_dormitory/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dormitory_id: dormitoryId, user_id: userId }),
      }
    );

    if (!response.ok) {
      throw new Error('Nie udało się przypisać użytkownika do akademika');
    }

    const data = await response.json();
    console.log('Użytkownik został przypisany pomyślnie:', data);
    alert('Użytkownik został przypisany pomyślnie!');
  } catch (error) {
    console.error('Błąd przypisywania użytkownika:', error);
    alert('Wystąpił błąd podczas przypisywania użytkownika');
  }
};
