/*

Design and implement a library management system applying everything form Week 1 (SOLID) and Week 2 (OOP Pillars). Use the 
5-step decomposition framework fro the hotel booking exercise. Start with the English sentence, then build from there

*/

enum LoanStatus {
  Active = 'Active',
  Returned = 'returned',
  Overdue = 'overdue',
}

interface ValidationResult {
  valid: boolean;
  errors: string[]
}

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
  private _available: boolean = true;

  constructor(id: string, title: string, year: number) {
    this.id = id;
    this.title = title;
    this.year = year;
  }

  get isAvailable(): boolean {
    return this._available;
  }

  markBorrowed(): void {
    if (!this._available) throw new Error(`${this.title} is already borrowed`)
      this._available = false;
  }
  
  markReturned(): void {
    this._available = true'
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getYear(): number {
    return this.year;
  }

  abstract get itemType(): string;

  abstract getSearchableText(): string;
}

class Book extends LibraryItem {
  ISBN: string;
  author: string;

  constructor(
    id: string,
    title: string,
    year: number,
    ISBN: string,
    author: string,
  ) {
    super(id, title, year);
    this.ISBN = ISBN;
    this.author = author;
  }

  get itemType() {
    return "book";
  }

  getSearchableText(): string {
    return `${this.title} ${this.author} ${this.ISBN}`
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
    director: string,
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

  
  get itemType() {
    return "DVD";
  }

  getSearchableText(): string {
    return `${this.title} ${this.director}`
  }
}


// Borrowing Policy
interface BorrowingPolicy {
  readonly maxItems: number;
  readonly loanDurationDays: number;
}

const StudentPolicy: BorrowingPolicy =  {maxItems: 3, loanDurationDays: 14};
const TeacherPolicy: BorrowingPolicy = {maxItems: 10, loanDurationDays: 30};
const PublicPolicy: BorrowingPolicy = {maxItems: 5, loanDurationDays: 21}


class BorrowService {
  constructor(
    private validator: MemberValidator,
    private itemAvailablity: ItemAvailability,
    private dbRepo: DBRepository<Book>,
    private notifier: Notifier,
  ) {}

  async borrowBook(item: LibraryItem) {
    const isMemberValid = this.validator.validate();
    if (!isMemberValid) {
      throw new Error('Member is not valid');
    }

    const isItemAvaiable = this.itemAvailablity.checkAvailability(item);
    if (!isItemAvaiable) {
      throw new Error('Item is not available');
    }
  }
}
