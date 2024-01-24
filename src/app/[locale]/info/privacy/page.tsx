import { Metadata } from 'next';
import PrivacyPolicy from '@/components/info/policy';
export const metadata: Metadata = {
    robots: 'noindex',
};
export default async function Page() {
    return (
        <PrivacyPolicy />
    );
}
