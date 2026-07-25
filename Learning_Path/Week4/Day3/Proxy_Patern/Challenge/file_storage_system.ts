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

class S3FileStorage implements FileStorage {}

class LaxyFileStorage implements FileStorage {
  fileStorageInstance: FileStorage;

  getInstance() {
    if (this.fileStorageInstance) {
      return this.fileStorageInstance;
    }
    return new FileSt();
  }
}
