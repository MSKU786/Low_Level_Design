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



// Constrained Generics

interface HasTimestamps {
  createdAt: Date;
  updatedAt: Date;
}


interface Entity extends HasId, HasTimestamps {}


function sortByCreated<T extends HasTimestamps>(items: T[]): T[] {
  return [...items].sort(
    (a,b) => b.createdAt.getTime() - a.createdAt.getTime()
  )
}


const recent = sortByCreated(user.findAll());


// Multiple constrainsts with & 
function upsert<T extends HasId & HasTimestamps>(
  repo: Repository<T>,
  item: T
): void {
  const existing = repo.findById(item.id);
  if (existing) {
    item.updatedAt = new Date()
  }
  repo.save(item);
}

// Keyof constrainst = type-safe property access
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

const names = pluck(user.findAll(), "name");