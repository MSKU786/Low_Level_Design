interface ReadableStorage {
  async read(path: string): Promise<string> {}
}

interface WritableStorage {
  abstract write(path: string, content: string): Promise<void>;
}

interface DeletableStorage {
  abstract delete(path: string): Promise<void>;
}

interface ListableStorage {
  abstract list(directory: string): Promise<string[]>;
}

type FullStorage = ReadableStorage &
  WritableStorage &
  DeletableStorage &
  ListableStorage;

class LocalStorage implements FullStorage {
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


// --------------------
// ReadOnly Storage (Now valid - no fake methods)
// --------------------

class ReadOnlyStorage implements ReadableStorage, ListableStorage {
  constructor(
    private source: ReadableStorage & ListableStorage
  ) {}

  async read(path: string): Promise<string> {
    return this.source.read(path);
  }

  async list(directory: string): Promise<string[]> {
    return this.source.list(directory);
  }
}

// --------------------
// Cloud Storage (No stronger preconditions)
// --------------------

class CloudStorage implements FullStorage {
  async read(path: string): Promise<string> {
    return cloudClient.getObject(path);
  }

  async write(path: string, content: string): Promise<void> {
    await cloudClient.putObject(path, content);
  }

  async delete(path: string): Promise<void> {
    await cloudClient.deleteObject(path);
  }

  async list(directory: string): Promise<string[]> {
    // Normalize output to match contract (filenames only)
    const fullPaths = await cloudClient.listObjects(directory);

    return fullPaths.map((p: string) => {
      const parts = p.split("/");
      return parts[parts.length - 1]; // extract filename
    });
  }
}


// --------------------
// Encrypted Storage (Decorator Pattern)
// --------------------

class EncryptedStorage implements ReadableStorage, WritableStorage {
  constructor(
    private inner: ReadableStorage & WritableStorage,
    private key: string
  ) {}

  async read(path: string): Promise<string> {
    const encrypted = await this.inner.read(path);

    const decrypted = decrypt(encrypted, this.key);

    if (!decrypted) {
      throw new Error("Decryption failed or invalid data");
    }

    return decrypted;
  }

  async write(path: string, content: string): Promise<void> {
    const encrypted = encrypt(content, this.key);
    await this.inner.write(path, encrypted);
  }
}


// --------------------
// Consumer (Correctly depends on minimal interfaces)
// --------------------

async function backupFiles(
  source: ReadableStorage & ListableStorage,
  dest: WritableStorage,
  directory: string
) {
  const files = await source.list(directory);

  for (const file of files) {
    const content = await source.read(file);
    await dest.write(file, content);
  }
}
