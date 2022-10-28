type METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type HttpHeaders = {
    [key: string]: string;
};

type BodyInit =
    | Blob
    | BufferSource
    | FormData
    | URLSearchParams
    | string;

export type Options = {
    timeout?: number;
    headers?: HttpHeaders;
    method?: METHOD;
    data?: Document | BodyInit | XMLHttpRequestBodyInit | null | undefined;
};

function queryStringify(data: any) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const stringified = Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    return `?${stringified}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class HTTPTransport {
    get = (url: string, options: Options = {} as Options) => {
        if (options.data) {
            url = `${url}${queryStringify(options.data)}`;
        }
        return this.request(url, { ...options, method: 'GET' });
    };

    put = (url: string, options: Options) =>
        this.request(url, { ...options, method: 'PUT' });

    post = (url: string, options: Options = {} as Options) =>
        this.request(url, { ...options, method: 'POST' });

    delete = (url: string, options: Options) =>
        this.request(url, { ...options, method: 'DELETE' });

    request = (url: string, options: Options) => {
        const { timeout = 5000, headers = {}, data, method } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (typeof method === 'string') {
                xhr.open(method, url);
            }

            xhr.timeout = Number(timeout);
            xhr.withCredentials = true;

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(xhr);
            };
            xhr.onabort = () => {
                reject();
            };

            xhr.onerror = () => {
                reject();
            };
            xhr.ontimeout = () => {
                reject();
            };

            if (method === 'GET' || !data) {
                xhr.send();
            } else if (method === 'PUT' && data) {
                xhr.send(data);
			} else if (typeof data !== 'string') {
					xhr.send(JSON.stringify(data));
				} else { 
					xhr.send(data);
				}
        });
    };
}

export default new HTTPTransport();
