//YOUR CHALLENGE: Build a data pipeline with decorators

// Time: 30 minutes

// You have a simple data repository:

interface DataRepository {

}

get(key: string): Promise string | null>;

set(key: string, value: string): Promise<void>;

delete(key: string): Promise<void>;

// The base implementation just stores in memory: class InMemoryRepository implements DataRepository { ... }

// Build these 4 decorators:

// 1. LoggingDecorator

11 Logs every operation: "[LOG] GET key=users:123"

Logs result: "[LOG] GET users:123 found" or " miss"

Logs timing: "[LOG] GE users:123 took 5ms"

// 2. CachingDecorator

11 Caches GET results in a Map with TTL (time-to-live)

11 On GET: if cached and not expired return cached (skip inner)

11 On SET: update cache delegate to inner

11 On DELETE: remove from cache delegate to inner

// 3. ValidationDecorator

11 Validates key format (no spaces, max 100 chars)

11 Validates value (max 1MB size)

Throws descriptive errors on invalid input

Delegates to inner if valid

↓
[8:29 pm, 20/7/2026] Manish Singh: RetryDecorator

Retries failed operations up to N times

Exponential backoff (1s, 25, 4s...)

Only retries on specific errors (network), not validation errors

// Then show stacking in composition root:

// const repo= new Logging(new Retry(new Caching(new Validation(new InMemory()))))

//

// A GET call would: log retry if failed check cache validate key fetch from

// BONUS: Add a 5th decorator EncryptionDecorator

// - Encrypts value before SET, decrypts after GET

The inner repository never sees plaintext