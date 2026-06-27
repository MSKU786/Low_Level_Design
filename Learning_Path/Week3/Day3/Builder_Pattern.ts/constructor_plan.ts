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

// What does this even mean?

const req = new HttpRequest(
  'POST',
  'https://api.com/users',
  { 'Content-Type': 'application/json' },
  JSON.stringify({ name: 'John' }),
  5000,
  3,
  undefined,
  true,
  undefined,
  'json',
  false,
);

// Problem:
// 1. Unreadable: positoinal args are meanngless
// 2. Must apss undefined for optional params you don't need
// 3. Easy to swap two params and intruce silent bughs
// 4. No validation unitl runtime
