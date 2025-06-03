/*
Intent: Provide a way to create objects without specifying the exact class of object that will be created.

Problem: Imagine you have a system that needs to create different types of database connections (e.g., MySQL, PostgreSQL, MongoDB). You want to decouple the object creation process from the specific class of database connection.

Solution: Introduce a Factory class that returns an object of a specific class based on a given parameter or configuration.


*/

// Product Interface

interface DatabaseConnection {
  connect(): void;
  query(sql: string): void;
}

// Concrete Product classes
class MySQLConnection implements DatabaseConnection {
  connect(): void {
    console.log('Connected to MySQL');
  }
  query(sql: string): void {
    console.log(`MySQL Query: ${sql}`);
  }
}

class PostgreSQLConnection implements DatabaseConnection {
  connect(): void {
    console.log('Connected to PostgreSQL');
  }
  query(sql: string): void {
    console.log(`PostgreSQL Query: ${sql}`);
  }
}

// Factory class
class DatabaseConnectionFactory {
  static createConnection(type: 'mysql' | 'postgresql'): DatabaseConnection {
    if (type === 'mysql') {
      return new MySQLConnection();
    } else if (type === 'postgresql') {
      return new PostgreSQLConnection();
    } else {
      throw new Error('Invalid database type');
    }
  }
}

// Client code
const factory = DatabaseConnectionFactory;
const mysqlConn = factory.createConnection('mysql');
mysqlConn.connect(); // Output: Connected to MySQL
mysqlConn.query('SELECT * FROM users'); // Output: MySQL Query: SELECT * FROM users

const postgresConn = factory.createConnection('postgresql');
postgresConn.connect(); // Output: Connected to PostgreSQL
postgresConn.query('SELECT * FROM customers'); // Output: PostgreSQL Query: SELECT * FROM customers
