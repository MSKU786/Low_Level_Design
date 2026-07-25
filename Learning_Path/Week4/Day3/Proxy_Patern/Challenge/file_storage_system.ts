/**
 * YOUR CHALLENGE: Build a File Storage System using Proxies
 *
 * Time: ~30 minutes
 */

interface FileStorage {
  read(path: string): Promise<string>;

  write(path: string, content: string): Promise<void>;

  delete(path: string): Promise<void>;

  exists(path: string): Promise<boolean>;
}

/* -------------------------------------------------------------------------- */
/* 1. LazyFileStorage (Virtual Proxy)                                         */
/* -------------------------------------------------------------------------- */

/**
 * The real cloud storage client is expensive to create.
 * It performs operations like:
 *   - Authentication
 *   - Opening network connections
 *   - Initializing SDKs
 *
 * Requirements:
 *   - Do NOT create the real storage client in the constructor.
 *   - Create it only when the first storage operation is invoked.
 *   - After the first initialization, reuse the same instance for all
 *     subsequent operations.
 */

/* -------------------------------------------------------------------------- */
/* 2. AccessControlProxy (Protection Proxy)                                   */
/* -------------------------------------------------------------------------- */

/**
 * This proxy receives a user with one of the following roles:
 *
 *   - "reader"
 *   - "writer"
 *   - "admin"
 *
 * Permissions:
 *
 * reader
 *   ✅ read()
 *   ✅ exists()
 *   ❌ write()
 *   ❌ delete()
 *
 * writer
 *   ✅ read()
 *   ✅ write()
 *   ✅ exists()
 *   ❌ delete()
 *
 * admin
 *   ✅ read()
 *   ✅ write()
 *   ✅ delete()
 *   ✅ exists()
 *
 * Any blocked operation should throw:
 *   throw new Error("Permission denied");
 */

/* -------------------------------------------------------------------------- */
/* 3. QuotaProxy (Protection Proxy Variant)                                   */
/* -------------------------------------------------------------------------- */

/**
 * Each user has a storage quota (for example, 100 MB).
 *
 * Requirements:
 *
 * - write() should check whether adding the new content would exceed
 *   the user's remaining quota.
 *
 * - If the quota would be exceeded, throw:
 *     throw new Error("Quota exceeded");
 *
 * - read(), delete(), and exists() should simply delegate to the
 *   underlying storage implementation.
 */

/* -------------------------------------------------------------------------- */
/* Composition                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Stack all three proxies together.
 *
 * Example:
 *
 * const storage = new AccessControlProxy(
 *   new QuotaProxy(
 *     new LazyFileStorage("s3://my-bucket"),
 *     quotaManager
 *   ),
 *   currentUser
 * );
 */

class S3FileStorage implements FileStorage {
  awsSDK: AwsSDK;

  constructor(key: string, secret: string) {
    this.awsSDK = new AwsSDK(key, secret);
  }

  read(path: string): Promise<string> {
    console.log(path);
    return Promise.resolve(path);
  }

  write(path: string, content: string): Promise<void> {
    console.log(path, content);
    return Promise.resolve();
  }

  delete(path: string): Promise<void> {
    console.log(path);
    return Promise.resolve();
  }

  exists(path: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}

class LaxyFileStorage implements FileStorage {
  private realStorageInstance: S3FileStorage | null = null;
  private key: string;
  private value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  getInstance() {
    if (this.realStorageInstance) {
      return this.realStorageInstance;
    }
    return new S3FileStorage(this.key, this.value);
  }

  read(path: string): Promise<string> {
    return this.getInstance().read(path);
  }

  write(path: string, content: string): Promise<void> {
    return this.getInstance().write(path, content);
  }

  delete(path: string): Promise<void> {
    console.log(path);
    return this.getInstance().delete(path);
  }

  exists(path: string): Promise<boolean> {
    return this.getInstance().exists(path);
  }
}

interface User {
  id: string;
  role: 'reader' | 'writer' | 'admin';
  currentUsage: number;
}

class AccessControlProxy implements FileStorage {
  constructor(
    private inner: FileStorage,
    private currentUser: User,
  ) {}

  read(path: string): Promise<string> {
    return this.inner.read(path);
  }

  write(path: string, content: string): Promise<void> {
    if (this.currentUser.role === 'reader') {
      throw new Error('User is not authorized to perform action');
    }
    return this.inner.write(path, content);
  }

  delete(path: string): Promise<void> {
    console.log(path);

    if (
      this.currentUser.role === 'reader' ||
      this.currentUser.role === 'writer'
    ) {
      throw new Error('User is not authorized to perform action');
    }
    return this.inner.delete(path);
  }

  exists(path: string): Promise<boolean> {
    return this.inner.exists(path);
  }
}

class QuotaProxy implements FileStorage {
  private QuotaLimit = 100000;

  constructor(
    private inner: FileStorage,
    private currentUser: User,
  ) {}

  read(path: string): Promise<string> {
    return this.inner.read(path);
  }

  write(path: string, content: string): Promise<void> {
    if (this.currentUser.currentUsage < this.QuotaLimit) {
      return this.inner.write(path, content);
    }

    throw new Error('Quota Exceeded');
  }

  delete(path: string): Promise<void> {
    console.log(path);
    return this.inner.delete(path);
  }

  exists(path: string): Promise<boolean> {
    return this.inner.exists(path);
  }
}
