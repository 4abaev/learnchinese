import { IGuidePageFields } from '@/interfaces/guidePageFields';
import { HttpClient } from './axios';
import { IFooterFields } from '@/interfaces/footerFields';
const prerenderInstance = HttpClient.getPrerenderInstance();
import { IBannerAboutFields } from '@/interfaces/bannerAboutFields';
import { ISubInfoPageFields } from '@/interfaces/subInfoPageFields';
import { IGlobalFields } from '@/interfaces/globalFields';





export const getBannerAboutFields = async (locale:string) => {
    try {
          const res: {data: IBannerAboutFields} = await prerenderInstance.get(`/banner-about?populate=*&locale=${locale}`);
          return res.data;
    } catch (error) {
        console.error(error);
    }
};


export const getFooterFields = async (locale:string) => {
    try {
          const res: {data: IFooterFields} = await prerenderInstance.get(`/footer?populate=*&locale=${locale}`);
          return res.data;
    } catch (error) {
        console.error(error);
    }
};


export const getGuidePageFields = async (locale:string) => {
    try {
  
          const res: {data: IGuidePageFields} = await prerenderInstance.get(`/guide-page?guide-page?populate[0]=steps&populate[1]=steps.image&locale=${locale}`);
     
          return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getSubInfoPageFields = async (locale:string) => {
    try {
  
          const res: {data: ISubInfoPageFields} = await prerenderInstance.get(`/subscription-page?populate[0]=steps&populate[1]=steps.image&locale=${locale}`);
     
          return res.data;
    } catch (error) {
        console.error(error);
    }
};


export const getGlobalFields = async (locale:string) => {
    try {
          const res: {data: IGlobalFields} = await prerenderInstance.get(`/global?populate=*&locale=${locale}`);
          return res.data;
    } catch (error) {
        console.error(error);
    }
};