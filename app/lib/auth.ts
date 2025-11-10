import { cookies } from 'next/headers';

export async function auth() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('AUTH_TOKEN')?.value;
    if (!token) return null;

    try {
        const res = await fetch('https://api.vibraventura.com.br/api/me', {
            headers: { Cookie: `AUTH_TOKEN=${token}` },
        });
        return res.ok ? res.json() : null;
    } catch {
        return null;
    }
}