/*

Design and implement a library management system applying everything form Week 1 (SOLID) and Week 2 (OOP Pillars). Use the 
5-step decomposition framework fro the hotel booking exercise. Start with the English sentence, then build from there

*/


interface MemberValidator {
  validate(): boolean;
}

interface ItemAvailability {
  checkAvailability(): boolean;
}

interface DBRepository<T> {
  save(item: T): void;
  update(item: T): void;
}

interface Notifier {
  send(message: string): void;
}

interface Entity {
  id: string;
  title: string;
  year: number;
}

abstract class LibraryItem implements Entity {
  id: string;
  title: string;
  year: number;

  constructor(id: string, title: string, year: number) {
    this.id = id;
    this.title = title;
    this.year = year;
  }

  abstract getFineRate(): number;

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getYear(): number {
    return this.year;
  }
}

class Book extends LibraryItem {
  ISBN: string;
  author: string;

  constructor(
    id: string,
    title: string,
    year: number,
    ISBN: string,
    author: string
  ) {
    super(id, title, year);
    this.ISBN = ISBN;
    this.author = author;
  }

  getFineRate(): number {
    return 2;
  }

  getISBN(): string {
    return this.ISBN;
  }

  getAuthor(): string {
    return this.author;
  }
}

class DVD extends LibraryItem {
  duration: number;
  director: string;

  constructor(
    id: string,
    title: string,
    year: number,
    duration: number,
    director: string
  ) {
    super(id, title, year);
    this.duration = duration;
    this.director = director;
  }

  getFineRate(): number {
    return 5;
  }

  getDuration(): number {
    return this.duration;
  }

  getDirector(): string {
    return this.director;
  }
}