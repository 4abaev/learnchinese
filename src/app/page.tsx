import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMe } from '@/api/auth';
import { HttpClient } from '@/api/axios';

export default async function Home() {
    const cookiesStore = cookies();
    const jwt = cookiesStore.get('jwt')?.value;
    HttpClient.updateAuthorizedPrerenderInstance(jwt);
    const user = await getMe();
    if (!user) {
        redirect('/auth/login');
    }
    redirect('/movies');
}
