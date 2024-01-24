import { IMetadata } from '@/interfaces/metadata';
import { HttpClient } from './axios';
const prerenderInstance = HttpClient.getPrerenderInstance();



export const getMetaData = async ( page:string, locale: string) => {
    try {
   const res:{data:IMetadata} =  await prerenderInstance.get(`/${page}-page?populate=*&locale=${locale}`);
          return res.data;
    } catch (error) {
        console.error(error);
    }
};