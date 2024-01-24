import axios, { AxiosInstance } from 'axios';
import { parseCookies } from 'nookies';

const strapi_url_http = process.env.NEXT_PUBLIC_STRAPI_URL_HTTP;
const strapi_url_https = process.env.NEXT_PUBLIC_STRAPI_URL_HTTPS;

export class HttpClient {
    private static baseInstance: AxiosInstance | null = null;
    private static authorizedInstance: AxiosInstance | null = null;
    private static authorizedPrerenderInstance: AxiosInstance | null = null;
    private static prerenderInstance: AxiosInstance | null = null;

    public static getBaseInstance(): AxiosInstance {
        if (this.baseInstance) return this.baseInstance;
        this.baseInstance = axios.create({
            baseURL: strapi_url_https,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return this.baseInstance;
    }

    public static getPrerenderInstance(): AxiosInstance {
        if (this.prerenderInstance) return this.prerenderInstance;
        this.prerenderInstance = axios.create({
            baseURL: strapi_url_http,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return this.prerenderInstance;
    }

    public static getAuthorizedInstance(): AxiosInstance {
        if (this.authorizedInstance) return this.authorizedInstance;
        const { jwt } = parseCookies();
        return this.updateAuthorizedInstance(jwt);
    }

    public static updateAuthorizedInstance(jwt: string | undefined) {
        this.authorizedInstance = axios.create({
            baseURL: strapi_url_https,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        });
        return this.authorizedInstance;
    }
    public static getAuthorizedPrerenderInstance(): AxiosInstance {
        if (this.authorizedPrerenderInstance) return this.authorizedPrerenderInstance;
        const { jwt } = parseCookies();

        return this.updateAuthorizedPrerenderInstance(jwt);
    }

    public static updateAuthorizedPrerenderInstance(jwt: string | undefined) {
        this.authorizedPrerenderInstance = axios.create({
            baseURL: strapi_url_http,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        });
        return this.authorizedPrerenderInstance;
    }
}
