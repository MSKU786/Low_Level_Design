// Generic Repo - Written once, works for ANY type with an id


interface HasId {
  readonly id: string;
}

class Repository<T extends HasId> {
  private items: Map<String, T> = new Map()

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  findAll(): T[] {
    return [...this.items.values()]
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }

  count(): number {
    return this.items.size;
  }
}


// Usage - Fully type safe , zero duplication

const users = new Repository<User>();
users.save({id: 'u1', name: 'Rahul', email : 'r@mail.ocm'})
const user = users.findById('u1')