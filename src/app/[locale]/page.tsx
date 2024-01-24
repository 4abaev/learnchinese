import { redirect } from 'next/navigation';

export default function Page() {
    redirect('/movies');
    return <></>;
    // if (typeof window !== 'undefined') {
    //     return window.location.replace('/movies');
    // }
}
