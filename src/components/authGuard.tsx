import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { HttpClient } from '@/api/axios';
import { getMe } from '@/api/auth';

export default async function AuthGuard({ children }: { children: React.ReactNode }) {
    const cookiesStore = cookies();
    const jwt = cookiesStore.get('jwt')?.value;
    HttpClient.updateAuthorizedPrerenderInstance(jwt);
    const user = await getMe();
    if (!user) {
        redirect('/auth/login');
    }
    return <>{children}</>;
}
