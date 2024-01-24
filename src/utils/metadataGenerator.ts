import { getMetaData } from "@/api/metadata";
import { IMetadata } from "@/interfaces/metadata";
import { cookies } from "next/headers";


export async function metadataGenerator(name:string) {
    const cookiesStore = cookies();
    const locale = cookiesStore.get('NEXT_LOCALE')?.value;
    const res : IMetadata | undefined = await getMetaData(name , locale || 'ru');
    return {
        title: res?.data?.attributes?.metadata?.title,
        description: res?.data?.attributes?.metadata?.description,
        keywords: res?.data?.attributes?.metadata?.keywords,
    };
};