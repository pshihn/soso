export declare type Params = { [name: string]: string };

export function createUrl(path: string, baseUrl: string = '', params?: Params): string {
  const url = new URL(path, baseUrl);
  if (params) {
    let q = '?';
    let first = true;
    for (const name in params) {
      q = `${q}${first ? '' : '&'}${name}=${encodeURIComponent(params[name])}`;
      first = false;
    }
    url.search = q;
  }
  return url.toString();
}

function appendToHeaders(header: Headers, params?: Params) {
  if (params) {
    for (const name in params) {
      header.append(name, params[name]);
    }
  }
}

export async function get<T>(url: string, includeCredentials: boolean = true, headerParams?: Params): Promise<T> {
  const init: RequestInit = { credentials: includeCredentials ? 'include' : 'same-origin' };
  if (headerParams) {
    const headers = new Headers();
    appendToHeaders(headers, headerParams);
    init.headers = headers;
  }
  const response = await fetch(url, init);
  if (!response.ok) {
    const message = await response.text();
    throw { status: response.status, message, response };
  }
  return (await response.json()) as T;
}

export async function post<T>(url: string, data: any, includeCredentials: boolean = true, headerParams?: Params): Promise<T> {
  const init: RequestInit = { method: 'POST', credentials: includeCredentials ? 'include' : 'same-origin', body: JSON.stringify(data) };
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  appendToHeaders(headers, headerParams);
  init.headers = headers;
  const request = new Request(url, init);
  const response = await fetch(request);
  if (!response.ok) {
    const message = await response.text();
    throw { status: response.status, message, response };
  }
  return (await response.json()) as T;
}

export async function del(url: string, includeCredentials: boolean = true, headerParams?: Params): Promise<Response> {
  const init: RequestInit = { method: 'DELETE', credentials: includeCredentials ? 'include' : 'same-origin' };
  if (headerParams) {
    const headers = new Headers();
    appendToHeaders(headers, headerParams);
    init.headers = headers;
  }
  const request = new Request(url, init);
  const response = await fetch(request);
  if (!response.ok) {
    const message = await response.text();
    throw { status: response.status, message, response };
  }
  return response;
}

export function beacon(url: string, data: any): boolean {
  const payload = (data && (typeof data !== 'string')) ? JSON.stringify(data) : (data as string || '');
  if (window.navigator.sendBeacon) {
    return window.navigator.sendBeacon(url, payload);
  }
  return false;
}

export async function postFile<T>(url: string, formData: FormData, headerParams?: Params): Promise<T> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open('POST', url);
    if (headerParams) {
      for (const name in headerParams) {
        request.setRequestHeader(name, headerParams[name]);
      }
    }
    request.onload = () => {
      const status = request.status;
      if (status === 0 || status >= 400) {
        if (request.responseText) {
          reject({ status, message: request.responseText });;
        } else {
          reject({ status, message: 'Upload request failed with code: ' + status });
        }
      } else {
        if (request.responseText) {
          resolve(JSON.parse(request.responseText));
        } else {
          resolve({} as any);
        }
      }
    };
    request.onerror = (err) => {
      reject({ status: 0, message: `There was a network error on file upload: ${err}` });
    };
    request.send(formData);
  });
}