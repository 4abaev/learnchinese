import { cookies } from 'next/headers';
import { getSerialAttributes } from '@/api/medias';
import SeriesPageComponent from '@/components/media/SeriesPageComponent';

interface IParams {
    serialId: string;
    seazonId: string;
    seriesId: string;
}


export default async function SerialPage({ params }: { params: IParams }) {
    const cookiesStore = cookies();
    const locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const serialId = Number(decodeURIComponent(params.serialId));
    const serial = await getSerialAttributes(serialId, locale || 'ru');
    const currentSeries =
        await serial.Seazon[Number(params.seazonId) - 1].Series[Number(params.seriesId) - 1];

    return (
        <SeriesPageComponent
            seazonNumber={params.seazonId}
            serial={serial}
            series={currentSeries}
        />
    );
}
