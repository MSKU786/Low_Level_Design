class UserRepository {
  private items: Map<string, User> = new Map();

  save(user: User): void {
    this.items.set(user.id, user);
  }

  findById(id: string): User | undefined {
    return this.items.get(id);
  }

  findAll(): User[] {
    return [...this.items.values()]
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

class OrderRepository {
  private items: Map<string, Order> = new Map();

  save(order: Order): void {
    this.items.set(order.id, order);
  }

  findById(id: string): Order | undefined {
    return this.items.get(id);
  }

  findAll(): Order[] {
    return [...this.items.values()]
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

// Same for product comment and other entities
// update a function need to update 5 functions