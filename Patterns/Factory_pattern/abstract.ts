/*

2. Abstract Factory Design Pattern

Intent: Provide a way to encapsulate a group of individual factories that have a common theme without specifying their concrete classes.

Problem: Extend the previous example to create not only database connections but also logging mechanisms (e.g., FileLogger, ConsoleLogger) that are coupled with the database connections (e.g., MySQL with FileLogger, PostgreSQL with ConsoleLogger).

Solution: Introduce an Abstract Factory interface that declares a set of methods for creating related objects (database connections and loggers). Concrete factories implement this interface to provide specific object sets.

*/

// Product interfaces
interface DatabaseConnection {
  connect(): void;
  query(sql: string): void;
}

interface Logger {
  log(message: string): void;
}

// Concrete Product classes (Database Connections)
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

// Concrete Product classes (Loggers)
class FileLogger implements Logger {
  log(message: string): void {
    console.log(`File Log: ${message}`);
  }
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`Console Log: ${message}`);
  }
}

// Abstract Factory interface
interface DatabaseLoggerFactory {
  createDatabaseConnection(): DatabaseConnection;
  createLogger(): Logger;
}

// Concrete Factory classes
class MySQLFactory implements DatabaseLoggerFactory {
  createDatabaseConnection(): DatabaseConnection {
    return new MySQLConnection();
  }
  createLogger(): Logger {
    return new FileLogger();
  }
}

class PostgreSQLFactory implements DatabaseLoggerFactory {
  createDatabaseConnection(): DatabaseConnection {
    return new PostgreSQLConnection();
  }
  createLogger(): Logger {
    return new ConsoleLogger();
  }
}

// Client code
const mysqlFactory: DatabaseLoggerFactory = new MySQLFactory();
const mysqlConn = mysqlFactory.createDatabaseConnection();
const mysqlLogger = mysqlFactory.createLogger();

mysqlConn.connect(); // Output: Connected to MySQL
mysqlConn.query('SELECT * FROM users'); // Output: MySQL Query: SELECT * FROM users
mysqlLogger.log('MySQL Query executed'); // Output: File Log: MySQL Query executed

const postgresFactory: DatabaseLoggerFactory = new PostgreSQLFactory();
const postgresConn = postgresFactory.createDatabaseConnection();
const postgresLogger = postgresFactory.createLogger();

postgresConn.connect(); // Output: Connected to PostgreSQL
postgresConn.query('SELECT * FROM customers'); // Output: PostgreSQL Query: SELECT * FROM customers
postgresLogger.log('PostgreSQL Query executed'); // Output: Console Log: PostgreSQL Query executed
