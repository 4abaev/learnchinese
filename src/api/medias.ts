import { HttpClient } from './axios';
import { IMovie } from '@/interfaces';
const prerenderInstance = HttpClient.getPrerenderInstance();

type ArrayElementType = {
    id: number;
    attributes: IMovie;
};

export const getMovies = async (locale: string) => {
    try {
        return await (
            await prerenderInstance.get(`/movies?locale=${locale}`)
        ).data.data;
    } catch (error) {}
};

export const getMovie = async (movieId: number, locale: string) => {
    try {
        return await (
            await prerenderInstance.get(`/movies/${movieId}?locale=${locale}`)
        ).data.data.attributes;
    } catch (error) {}
};

export const getCartoons = async (locale: string) => {
    try {
        const CartoonsArray: ArrayElementType[] = await (
            await prerenderInstance.get(`/cartoons?locale=${locale}`)
        ).data.data;
        return CartoonsArray;
    } catch (error) {}
};
export const getCartoon = async (cartoonId: number, locale: string) => {
    try {
        return await (
            await prerenderInstance.get(`/cartoons/${cartoonId}?locale=${locale}`)
        ).data.data.attributes;
    } catch (error) {}
};

export const getSerials = async (locale: string) => {
    try {
        const SerialsArray: ArrayElementType[] = await (
            await prerenderInstance.get(`/serials?locale=${locale}`)
        ).data.data;
        return SerialsArray;
    } catch (error) {}
};

export const getSerial = async (serialId: number, locale: string) => {
    try {
        return await (
            await prerenderInstance.get(
                `/serials/${serialId}?populate=Seazon.Series&locale=${locale}`
            )
        ).data.data;
    } catch (error) {}
};
export const getSerialAttributes = async (serialId: number, locale: string) => {
    try {
        return await (
            await prerenderInstance.get(
                `/serials/${serialId}?populate=Seazon.Series&locale=${locale}`
            )
        ).data.data.attributes;
    } catch (error) {}
};
