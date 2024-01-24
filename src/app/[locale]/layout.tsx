import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import styles from './../layout.module.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import {getFooterFields, getGlobalFields } from '@/api/customFields';
import { cookies } from 'next/headers';


export const dynamic = 'force-dynamic';






export function generateStaticParams(){
    return [{ locale: 'ru' }, { locale: 'en' }];
}

export default async function Layout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }
    const cookiesStore = cookies();
    const next_locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const footerFields = await getFooterFields(next_locale || 'ru');
    const globalFields = await getGlobalFields(next_locale || 'ru');
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <div className={styles.wrapper}>
                <Header fields={globalFields} />
                <div className={styles.main}>
                    {children}
                </div>
                <Footer fields={footerFields} />
            </div>
        </NextIntlClientProvider>
    );
}
