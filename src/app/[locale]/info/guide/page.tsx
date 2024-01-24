import HowItWork from '@/components/info/howItWork';
import { cookies } from 'next/headers';
import { getGuidePageFields } from '@/api/customFields';
import { metadataGenerator } from '@/utils/metadataGenerator';


export const dynamic = 'force-dynamic';


export const generateMetadata = async () => {
    return metadataGenerator('guide');
};


export default async function Page() {
    const cookiesStore = cookies();
    const locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const gideFields = await getGuidePageFields(locale || 'ru');
    return (
        <HowItWork fields={gideFields} />
    );
}
