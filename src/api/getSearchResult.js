// export async function getSearchResult({ pageNo, recordCount, searchText, SearchMode, searchCritria, startDate, endDate }) {
//   const WebsiteID = process.env.NEXT_PUBLIC_WEBSITEID;
//   const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetSearchResult?PageIndex=${pageNo}&RecordCount=${recordCount}&searchKeyword=${searchText}&SearchMode=${SearchMode}&searchCritria=${searchCritria}&startdate=${startDate}&endDate=${endDate}`;

//   const res = await fetch(url);
//   const data = await res.json();

//   return data;
// }
export async function getSearchResult({ pageNo, recordCount, searchText, SearchMode, searchCritria, startDate, endDate }) {
  let token = localStorage.getItem('authToken');

  if (!token) {
    token = await getJWTToken(process.env.NEXT_PUBLIC_AUTHENTICATION_KEY);
    localStorage.setItem('authToken', token); // Save the token in localStorage
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/GetSearchResult?PageIndex=${pageNo}&RecordCount=${recordCount}&searchKeyword=${searchText}&SearchMode=${SearchMode}&searchCritria=${searchCritria}&startdate=${startDate}&endDate=${endDate}`;
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