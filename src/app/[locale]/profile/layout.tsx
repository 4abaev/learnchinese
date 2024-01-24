import { Metadata } from 'next';
import AuthGuard from '@/components/authGuard';

export const metadata: Metadata = {
    robots: 'noindex',
};
export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {children}
            </div>
        </AuthGuard>
    );
}
