// The problem: talescoping constructor

class HttpRequest {
  constructor(
    method: string,
    url: string,
    header?: Record<string, string>,
    body?: string,
    timeout?: number,
    retries?: number,
    auth?: { username: string; password: string },
    followRedirects?: boolean,
    validateStatus?: (status: number) => boolean,
    responseType?: 'json' | 'text' | 'blolb',
    cache?: boolean,
    signal?: AbortSignal,
  ) {}
}
