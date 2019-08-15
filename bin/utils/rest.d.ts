export declare type Params = {
    [name: string]: string;
};
export declare function createUrl(path: string, baseUrl?: string, params?: Params): string;
export declare function get<T>(url: string, includeCredentials?: boolean): Promise<T>;
export declare function post<T>(url: string, data: any, includeCredentials?: boolean): Promise<T>;
export declare function del(url: string, includeCredentials?: boolean): Promise<Response>;
export declare function beacon(url: string, data: any): boolean;
export declare function postFile<T>(url: string, formData: FormData): Promise<T>;
