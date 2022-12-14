import HTTPTransport, { Options } from './httptransport';
import {
    DefaultType,
    HTTPTransportResponseType,
    UserApiType,
} from './apiTypes';

export const BASE_URL = 'https://ya-praktikum.tech/api/v2/';
export const BASE_URL1 = '123123123';
export const BASE_URL12 = '546464564';
export const BASE_URL122 = '5464645123123';
export const asdasd = 'asdasdasd';
export const BASE_URL1221231 = '546464512321312312123';

type AuthApiType = {
    apiUrl: string;
    signin: (
        options: Options
    ) => Promise<HTTPTransportResponseType<DefaultType>>;
    signup: (
        options: Options
    ) => Promise<HTTPTransportResponseType<DefaultType>>;
    logout: () => Promise<any>;
    user: () => Promise<HTTPTransportResponseType<UserApiType>>;
};

const AuthApi: AuthApiType = {
    apiUrl: BASE_URL,
    async signin(options) {
        const response = await HTTPTransport.post<DefaultType>(
            `${this.apiUrl}auth/signin`,
            { ...options }
        );
        return response;
    },
    async signup(options) {
        const response = await HTTPTransport.post<DefaultType>(
            `${this.apiUrl}auth/signup`,
            { ...options }
        );
        return response;
    },
    logout() {
        return HTTPTransport.post(`${this.apiUrl}auth/logout`);
    },
    async user() {
        const response = await HTTPTransport.get<UserApiType>(
            `${this.apiUrl}auth/user`,
            { headers: {} }
        );

        return response;
    },
};

export default AuthApi;
