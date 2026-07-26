// Component - the shared interface

interface FileSystemNode {
  readonly name: string;
  getSIze(): number;
  print(indent?: string): void;
  find(name: string): FileSystemNode | null;
}

class File implements FileSystemNode {
  constructor(
    public readonly name: string,
    private readonly sizeBytes: number,
  ) {}

  getSIze(): number {
    return this.sizeBytes;
  }

  print(indent?: string): void {
    console.log('file printed successfully');
  }

  find(name: string): FileSystemNode | null {
    return null;
  }
}

class Folder implements FileSystemNode {
  private children: FileSystemNode[] = [];

  constructor(public readonly name: string) {}

  add(node: FileSystemNode): this {
    this.children.push(node);
    return this;
  }

  remove(name: string): void {
    this.children = this.children.filter((c) => c.name !== name);
  }

  getSIze(): number {
    return this.children.reduce((sum, child) => {
      return child.getSIze();
    }, 0);
  }

  print(indemt: string): void {
    console.log(indent);
  }

  find(name: string): FileSystemNode | null {
    if (this.name === name) return this;

    for (const child of this.children) {
      const found = child.find(name);
      if (found) return found;
    }
    return null;
  }
}
