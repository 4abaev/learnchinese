import { HttpClient } from './axios';
import { IUser } from '@/interfaces';

export const getMe = async () => {
    try {
        const authorizedInstance = HttpClient.getAuthorizedPrerenderInstance();
        const user: IUser = (await authorizedInstance.get('users/me')).data;

        return user;
    } catch (error) {
        return null;
    }
};
