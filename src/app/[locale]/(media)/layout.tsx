import NavBar from '@/components/layout/NavBar';
import BannerAbout from '@/components/layout/bannerAbout';
// import { getBannerInfo } from '@/api/medias';
import { cookies } from 'next/headers';
import { getBannerAboutFields} from '@/api/customFields';
import { metadataGenerator } from '@/utils/metadataGenerator';

export const dynamic = 'force-dynamic';




export async function generateMetadata() {
    const data = await metadataGenerator('movies');
 return {...data, viewport: 'width=device-width, initial-scale=1, maximum-scale=1', robots: 'index, follow' };

 };
    
    
    
    export default async function MediaLayout({ children }: { children: React.ReactNode }) {
    const cookiesStore = cookies();
    const next_locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const token = cookiesStore.get('jwt');
    const bannerAboutFields = await getBannerAboutFields( next_locale || 'ru');
    return (
        <>
            <NavBar />
            <BannerAbout token={token?.value} fields={bannerAboutFields} />
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {children}
            </div>
        </>
    );
}
