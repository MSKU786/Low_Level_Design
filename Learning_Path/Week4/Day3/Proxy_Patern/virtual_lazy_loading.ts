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
