import { cookies } from 'next/headers';
import { getSerials } from '@/api/medias';
import Poster from '@/components/media/poster';



export default async function Serials() {
    const cookiesStore = cookies();
    const locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const SerialsArray = await getSerials(locale || 'ru');

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px'}}>
            {SerialsArray?.map((serial) => (
                <Poster
                    {...serial.attributes}
                    key={serial.id}
                    id={serial.id}
                    videoUrl={serial.attributes.videoUrl}
                    releaseDate={serial.attributes.releaseDate}
                    description={serial.attributes.description}
                    hardLevel={serial.attributes.hardLevel}
                    posterUrl={serial.attributes.posterUrl}
                    name={serial.attributes.name}
                    rate={serial.attributes.rate}
                />
            ))}
        </div>
    );
}
