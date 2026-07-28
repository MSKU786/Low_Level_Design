interface OrgNode {
  readonly name: string;
  getSalaryBudget(): number;
  getHeadcount(): number;
  find(name: string): OrgNode | null;
  print(indent?: string): void;
}

class Employee implements OrgNode {
  constructor(
    public readonly name: string,
    public readonly designation: string,
    private readonly salary: number,
  ) {}

  getSalaryBudget(): number {
    return this.salary;
  }

  getHeadcount(): number {
    return 1;
  }

  find(name: string): OrgNode | null {
    return null;
  }

  print(indent?: string): void {
    console.log(`Employee: ${this.name}`);
  }
}

class Organization implements OrgNode {
  children: OrgNode[] = [];

  constructor(public readonly name: string) {}

  add(orgNode: OrgNode) {
    this.children.push(orgNode);
    return;
  }

  remove(orgNode: OrgNode) {
    return this.children.filter((node) => node != orgNode);
  }

  getSalaryBudget(): number {
    return this.children.reduce((sum, node) => {
      return sum + node.getSalaryBudget();
    }, 0);
  }

  getHeadcount(): number {
    return this.children.reduce(
      (total, node) => total + node.getHeadcount(),
      0,
    );
  }

  find(name: string): OrgNode | null {
    if (this.name === name) return this;

    for (const child of this.children) {
      const found = child.find(name);
      if (found) return found;
    }
    return null;
  }

  print(indent?: string): void {
    console.log(`Employee: ${this.name}`);
  }
}
