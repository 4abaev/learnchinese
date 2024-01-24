import { Metadata } from 'next';
import Oferta from '@/components/info/oferta';

export const metadata: Metadata = {
    robots: 'noindex',
};
export default async function Page() {
    return (
        <Oferta />
    );
}
