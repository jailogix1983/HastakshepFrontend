// export async function getAllAajtaklive() {
//   const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetAllAajtaklive`;
//   const res = await fetch(url);
//   const data = await res.json();

//   return data;
// }
// export async function getTagsByAajtakID(AajTakID) {
//   const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetTagsByAajtakID?AajTakID=${AajTakID}`;
//   const res = await fetch(url);
//   const data = await res.json();

//   return data;
// }
// export async function getALLAajtakbyTags(tag) {
//   const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetALLAajtakbyTags?Tag=${tag}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   return data;
// }
import { getJWTToken } from "./authToken";

export async function getAllAajtaklive() {
  let token = localStorage.getItem('authToken');


  if (!token) {
    token = await getJWTToken(process.env.NEXT_PUBLIC_AUTHENTICATION_KEY);
    localStorage.setItem('authToken', token); // Save the token in localStorage
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetAllAajtaklive`;
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
    throw new Error('Failed to fetch category list');
  }

  const result = await res.json();
  return result;
}
export async function getTagsByAajtakID(AajTakID) {
  let token = localStorage.getItem('authToken');


  if (!token) {
    token = await getJWTToken(process.env.NEXT_PUBLIC_AUTHENTICATION_KEY);
    localStorage.setItem('authToken', token); // Save the token in localStorage
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetTagsByAajtakID?AajTakID=${AajTakID}`;
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
    throw new Error('Failed to fetch category list');
  }

  const result = await res.json();
  return result;
}
export async function getALLAajtakbyTags(tag) {
  let token = localStorage.getItem('authToken');

  if (!token) {
    token = await getJWTToken(process.env.NEXT_PUBLIC_AUTHENTICATION_KEY);
    localStorage.setItem('authToken', token); // Save the token in localStorage
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetALLAajtakbyTags?Tag=${tag}`;
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
    throw new Error('Failed to fetch category list');
  }

  const result = await res.json();
  return result;
}