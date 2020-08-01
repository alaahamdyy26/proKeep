const API_BASEURL = 'https://reqres.in/api';

export const login = (email, password) =>
  fetch (`${API_BASEURL}/login`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email, password
    }),
  }).then(response => response.json())
    .then(data => {
      if ('error' in data) {
        throw new Error(data.error)
      }
      return data
    });

