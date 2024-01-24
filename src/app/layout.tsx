import './globals.css';
import { Providers } from './providers';



export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
