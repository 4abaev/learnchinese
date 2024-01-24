import { cookies } from 'next/headers';
import Head from 'next/head';
import Script from 'next/script';
import { getMovies } from '@/api/medias';
import { IMovie } from '@/interfaces';
import Poster from '@/components/media/poster';
import { YandexMetrika } from '@/app/YandexMetrika';


    
   


type ArrayElementType = {
    id: number;
    attributes: IMovie;
};

export default async function Movies() {
    const cookiesStore = cookies();
    const locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const MoviesArray: ArrayElementType[] = await getMovies(locale || 'ru');

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px'}}>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
            </Head>
            {MoviesArray?.map((movie) => (
                <Poster
                    {...movie.attributes}
                    key={movie.id}
                    id={movie.id}
                    videoUrl={movie.attributes.videoUrl}
                    releaseDate={movie.attributes.releaseDate}
                    description={movie.attributes.description}
                    hardLevel={movie.attributes.hardLevel}
                    posterUrl={movie.attributes.posterUrl}
                    name={movie.attributes.name}
                    rate={movie.attributes.rate}
                />
            ))}
            {/* eslint-disable-next-line @next/next/inline-script-id */}
            <Script type='text/javascript'>
                {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(95626172, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            })`}
            </Script>
            <YandexMetrika />
        </div>
    );
}
