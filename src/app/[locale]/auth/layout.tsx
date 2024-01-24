import { Metadata } from 'next';

export const metadata: Metadata = {
    robots: 'noindex',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {children}
            </div>
        </>
    );
}
