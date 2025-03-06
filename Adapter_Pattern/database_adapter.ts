interface DatabaseClient {
  insertOne(data: any): void;
  findOne(query: any): any;
  deleteOne(query: any): void;
}

class MongoDBInstance implements DatabaseClient {
  constructor() {
    console.log('Intialized mongo db instance');
  }

  insertOne(data: any): void {
    console.log('Inserted one', data);
  }

  findOne(query: any) {
    console.log('Find One solution', query);
  }

  deleteOne(query: any): void {
    console.log('delete the query', query);
  }
}

class PostgressInstance {
  constructor() {
    console.log('Postgress Instance initliaized');
  }

  executeInsert(data: any) {
    console.log('Execute a insert query', data);
  }

  executeSelect(query: any) {
    console.log('Execute a select query', query);
  }

  executeDelete(query: any) {
    console.log('Executeing a delte query', query);
  }
}

class PostgressAdapter implements DatabaseClient {
  pI: PostgressInstance;

  constructor(pI: PostgressInstance) {
    this.pI = pI;
  }
  insertOne(data: any): void {
    this.pI.executeInsert(data);
  }

  findOne(query: any) {
    this.pI.executeSelect(query);
  }

  deleteOne(query: any): void {
    this.pI.executeDelete(query);
  }
}
