//  Virtual Proxy

interface Database {
  query(sql: string): Promise<any[]>;
  execute(sql: string): Promise<void>;
  disconnect(): Promise<void>;
}

class PostgressDatabase implements Database {
  private pool: ConnectionPool;

  constructor(connectoinString: string) {
    console.log('Opending 10 database connections...');
    this.pool = new ConnectionPool(connectoinString, 10);
    console.log('Dataase ready (took 2 seconds)');
  }

  async query(sql: string): Promise<any[]> {
    return this.pool.query(sql);
  }

  async execute(sql: string): Promise<void> {
    return this.pool.execute(sql);
  }

  async disconnect(): Promise<void> {
    await this.pool.close();
  }
}

class LazyDatabase implements Database {
  private real: PostgressDatabase | null = null;
  private connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
    console.log('Database proxy created (no connectoin yet');
  }

  // Creates the real db on first use
  private getRealDatabase(): PostgressDatabase {
    if (!this.real) {
      console.log('First use - create real database now');
      this.real = new PostgressDatabase(this.connectionString);
    }
    return this.real;
  }

  // Lazy init
  async query(sql: string): Promise<any[]> {
    return this.getRealDatabase().query(sql);
  }

  async execute(sql: string): Promise<void> {
    return this.getRealDatabase().execute(sql);
  }

  async disconnect(): Promise<void> {
    if (this.real) {
      await this.real.disconnect();
      this.real = null;
    }
  }
}

const db: Database = new LazyDatabase('postgress://localhost/myDB');
await db.query('SELCT * from users');
await db.query('SELCT * FROM orders');
