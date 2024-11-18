export async function getJWTToken(AUTHENTICATION_KEY) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/hstoken`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyValue : AUTHENTICATION_KEY })
    });
    if (res.ok) {
        const data = await res.json();
        // localStorage.setItem('authToken', data.token); 
        return data.token;
    } else {
        throw new Error('Failed to fetch JWT token');
    }
}
