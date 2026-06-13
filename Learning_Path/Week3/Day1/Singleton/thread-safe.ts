// Database connection pool lazy initalization

class DatabasePool {
  private static instance: DatabasePool | null = null;
  private pool: Connection[];
  private maxConnections: number;

  private constructor(maxConnections: number) {
    this.maxConnections = maxConnections;
    this.pool = [];

    // Expensive: Opens actual connections
    for (let i = 0; i < maxConnections; i++) {
      this.pool.push(new Connection());
    }
    console.log(`Pool create with ${maxConnections} connections`);
  }

  static getInstance(maxConnections = 10): DatabasePool {
    if (!DatabasePool.instance) {
      DatabasePool.instance = new DatabasePool(maxConnections);
    }

    return DatabasePool.instance;
  }

  getConnection(): Connection {
    const available = this.pool.find((c) => !c.inUse);
    if (!available) throw new Error('No connection Avaiable');
    available.inUse = true;
    return available;
  }

  releaseConnection(conn: Connection): void {
    conn.inUse = false;
  }
}
