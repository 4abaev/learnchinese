import { cookies } from 'next/headers';
import { getSerial } from '@/api/medias';
import SerailPageComponent from '@/components/media/serialPageComponent';



export default async function SerialPage({ params }: { params: { serialId: string } }) {
    const cookiesStore = cookies();
    const locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const serialId = Number(decodeURIComponent(params.serialId));
    const res = await getSerial(serialId, locale || 'ru');
    const serial = await { ...res.attributes, id: res.id };
    return <SerailPageComponent serial={serial} />;
}
