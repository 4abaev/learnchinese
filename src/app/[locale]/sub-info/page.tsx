import { getSubInfoPageFields } from '@/api/customFields';
import SubInfoComponent from '@/components/sub-info';
import { metadataGenerator } from '@/utils/metadataGenerator';
import { cookies } from 'next/headers';


export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return metadataGenerator('subscription');
 };






export default async function Page() {
    const cookiesStore = cookies();
    const locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const subInfoFields = await getSubInfoPageFields(locale || 'ru');
    return (
        <SubInfoComponent fields={subInfoFields} />
    );
}