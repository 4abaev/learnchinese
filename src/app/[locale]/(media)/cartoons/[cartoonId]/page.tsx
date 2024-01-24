import { cookies } from 'next/headers';
import { getCartoon } from '@/api/medias';
import MoviePageComponent from '@/components/media/moviePageComponent';

export default async function CartoonPage({ params }: { params: { cartoonId: string } }) {
    const cookiesStore = cookies();
    const locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const cartoonId = Number(decodeURIComponent(params.cartoonId));
    const cartoon = await getCartoon(cartoonId, locale || 'ru');
    return <MoviePageComponent movie={cartoon} />;
}
