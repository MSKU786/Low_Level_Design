/*

Design a google calendar like system where users can:
Create view and manage events
any number of people can be added in an event
share evetns wit view edit permissions 
respond to evetn propse changes to evetns 
find time based on the availablity of users
*/

interface Repoistory<T> {
  save(item: T): void;
  update(item: T): void;
  findById(id: string): T | null;
  findAll: T[];
  delete(id: string): void;
}

class InMemoryRepository<T> implements Repoistory<T> {
  private items = new Map<string, T>();
  save(item: T): void {
    this.items.set(item.id, item);
  }

  update(item: T): void {
    this.items.set(item.id, item);
  }

  findById(id: string): T | null {
    return this.items.get(id) || null;
  }

  findAll(): T[] {
    return Array.from(this.items.values());
  }

  delete(id: string): void {
    this.items.delete(id);
  }
}

class User {
  id: string;
  name: string;
  email: string;
}

class Event {
  startTime: number;
  endTime: number;
  title: string;
  description: string | null;
  particpant: string[] = [];

  constructor(
    startTime: string,
    endTime: string,
    title: string,
    desription: string = '',
    particpant = [],
  ) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.title = title;
    this.description = desription;
    this.particpant = particpant;
  }
}
