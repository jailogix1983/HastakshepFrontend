// export async function getCategoryDataByEnglishURL({ category, RecordCount, PageIndex }) {
//   const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetDataByEnglisURL?EnglishURL=${category}&RecordCount=${RecordCount}&PageIndex=${PageIndex}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   return data;
// }
import { getJWTToken } from "./authToken";

export async function getCategoryDataByEnglishURL({  category, RecordCount, PageIndex }) {
  let token = localStorage.getItem('authToken');

  if (!token) {
    token = await getJWTToken(process.env.NEXT_PUBLIC_AUTHENTICATION_KEY);
    localStorage.setItem('authToken', token); // Save the token in localStorage
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetDataByEnglisURL?EnglishURL=${category}&RecordCount=${RecordCount}&PageIndex=${PageIndex}`;
  let res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (res.status === 401) { // Token might be invalid or expired
    token = await getJWTToken(process.env.NEXT_PUBLIC_AUTHENTICATION_KEY);
    localStorage.setItem('authToken', token); // Save the new token in localStorage
    res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  if (!res.ok) {
    throw new Error('Failed to fetch big news');
  }

  const result = await res.json();
  return result;
}