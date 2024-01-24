import { cookies } from 'next/headers';
import { getCartoons } from '@/api/medias';
import Poster from '@/components/media/poster';




export default async function Cartoons() {
    const cookiesStore = cookies();
    const locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const CartoonsArray = await getCartoons(locale || 'ru');
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px'}}>
            {CartoonsArray?.map((cartoon) => (
                <Poster
                    {...cartoon.attributes}
                    key={cartoon.id}
                    id={cartoon.id}
                    videoUrl={cartoon.attributes.videoUrl}
                    releaseDate={cartoon.attributes.releaseDate}
                    description={cartoon.attributes.description}
                    hardLevel={cartoon.attributes.hardLevel}
                    posterUrl={cartoon.attributes.posterUrl}
                    name={cartoon.attributes.name}
                    rate={cartoon.attributes.rate}
                />
            ))}
        </div>
    );
}
