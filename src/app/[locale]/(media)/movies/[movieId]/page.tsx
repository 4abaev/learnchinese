import { cookies } from 'next/headers';
import { getMovie } from '@/api/medias';
import MoviePageComponent from '@/components/media/moviePageComponent';



export default async function MoviePage({ params }: { params: { movieId: string } }) {
    const cookiesStore = cookies();
    const locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const movieId = Number(decodeURIComponent(params.movieId));
    const movie = await getMovie(movieId, locale || 'ru');
    return <MoviePageComponent movie={movie} />;
}
