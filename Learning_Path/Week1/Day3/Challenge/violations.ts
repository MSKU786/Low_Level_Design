 // YOUR CHALLENGE: Find and fix all LSP violations
// Time: ~35 minutes
// There are at least 4 violations. Can you find them all?

// A file storage system

abstract class FileStorage {
  abstract read(path: string): Promise<string>;
  abstract write(path: string, content: string): Promise<void>;
  abstract delete(path: string): Promise<void>;
  abstract list(directory: string): Promise<string[]>;
}

// Violation 1: Can you spot it?

class LocalStorage extends FileStorage {
  async read(path: string): Promise<string> {
    return fs.readFile(path, "utf-8");
  }

  async write(path: string, content: string): Promise<void> {
    await fs.writeFile(path, content);
  }

  async delete(path: string): Promise<void> {
    await fs.unlink(path);
  }

  async list(directory: string): Promise<string[]> {
    return fs.readdir(directory);
  }
}

// Violation 2: Look closely at what this does differently

class ReadOnlyStorage extends FileStorage {
  constructor(private source: FileStorage) {
    super();
  }

  async read(path: string): Promise<string> {
    return this.source.read(path);
  }

  async write(path: string, content: string): Promise<void> {
    throw new Error("Cannot write to read-only storage");
  }

  async delete(path: string): Promise<void> {
    throw new Error("Cannot delete from read-only storage");
  }

  async list(directory: string): Promise<string[]> {
    return this.source.list(directory);
  }
}

// Violation 3: What's wrong with this cloud storage?

class CloudStorage extends FileStorage {
  async read(path: string): Promise<string> {
    // Cloud paths must start with "bucket://"
    if (!path.startsWith("bucket://")) {
      throw new Error("Invalid cloud path format");
    }

    return cloudClient.getObject(path);
  }

  async write(path: string, content: string): Promise<void> {
    if (!path.startsWith("bucket://")) {
      throw new Error("Invalid cloud path format");
    }

    if (content.length > 5_000_000) {
      throw new Error("File too large for cloud storage");
    }

    await cloudClient.putObject(path, content);
  }

  async delete(path: string): Promise<void> {
    if (!path.startsWith("bucket://")) {
      throw new Error("Invalid cloud path format");
    }

    await cloudClient.deleteObject(path);
  }

  async list(directory: string): Promise<string[]> {
    // Returns full paths like "bucket://dir/file.txt"
    // while parent contract implies just filenames
    return cloudClient.listObjects(directory);
  }
}

// Violation 4: What about this encrypted storage?

class EncryptedStorage extends FileStorage {
  constructor(
    private inner: FileStorage,
    private key: string
  ) {
    super();
  }

  async read(path: string): Promise<string> {
    const encrypted = await this.inner.read(path);
    return decrypt(encrypted, this.key);

    // What if the file wasn't encrypted?
    // decrypt() returns garbage, not an error.
    // Caller expects readable content, gets gibberish.
  }

  async write(path: string, content: string): Promise<void> {
    const encrypted = encrypt(content, this.key);
    await this.inner.write(path, encrypted);
  }

  async delete(path: string): Promise<void> {
    await this.inner.delete(path);
  }

  async list(directory: string): Promise<string[]> {
    return this.inner.list(directory);
  }
}

// This function should work with ANY FileStorage

async function backupFiles(
  source: FileStorage,
  dest: FileStorage,
  directory: string
) {
  const files = await source.list(directory);

  for (const file of files) {
    const content = await source.read(file);
    await dest.write(file, content);
  }
}