// Fluent Builder

class HttpRequest {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly body?: string;
  readonly timeout: number;
  readonly retries: number;
  readonly auth?: { username: string; password: string };
  readonly responseType: 'json' | 'text' | 'blob';

  private constructor(builder: HttpRequestBuilder) {
    this.method = builder.method;
    this.url = builder.url;
    this.headers = builder.headers;
    this.body = builder.body;
    this.timeout = builder.timeout;
    this.retries = builder.retries;
    this.auth = builder.auth;
    this.responseType = builder.responseType;
  }

  static builder(method: string, url: string): HttpRequestBuilder {
    return new HttpRequestBuilder(method, url);
  }
}

class HttpRequestBuilder {
  readonly method: string;
  readonly url: string;

  headers: Record<string, string> = {};
  body?: string;
  timeout: number = 5000;
  retries: number = 0;
  auth?: { username: string; password: string };
  responseType: 'json' | 'text' | 'blob' = 'json';
  0;

  constructor(method: string, url: string) {
    this.method = method;
    this.url = url;
  }

  setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  setBody(body: string): this {
    this.body = body;
    return this;
  }

  setTimeout(ms: number): this {
    this.timeout = ms;
    return this;
  }

  setRetries(count: number): this {
    this.retries = count;
    return this;
  }

  setAuth(username: string, password: string): this {
    this.auth = { username, password };
    return this;
  }

  setResponseType(type: 'json' | 'text' | 'blob') {
    this.responseType = type;
    return this;
  }

  build(): HttpRequest {
    if (!this.url.startsWith('http')) {
      throw new Error('URL must start with http');
    }

    if (this.method === 'GET' && this.body) {
      throw new Error('GET request cannot have a body');
    }

    if (this.timeout < 0) {
      throw new Error('Timeout must be positive');
    }

    return new HttpRequest(this);
  }
}
