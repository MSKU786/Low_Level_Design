class Book {
  private title: string;
  private publicationYear: number;
  private author: string;

  constructor(title: string, author: string, publicationYear: number) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
  }
}

class BookCopy {
  private book: Book;
  private isAvailble: boolean;
  private id: string;

  constructor(book: Book) {
    this.id = crypto.randomUUID();
    this.book = book;
    this.isAvailble = true;
  }

  checkAvailablity(): boolean {
    return this.isAvailble;
  }

  private setAvailablity(isAvailble: boolean): void {
    this.isAvailble = isAvailble;
  }

  borrow(): void {
    this.setAvailablity(false);
  }

  return(): void {
    this.setAvailablity(true);
  }
}

class User {
  private name: string;
  private email: string;
  private idCard: string;
  private borrowedBookCopies: BookCopy[] = [];

  constructor(name: string, emeail: string, idCard: string) {
    this.name = name;
    this.email = emeail;
    this.idCard = idCard;
  }

  getName(): string {
    return this.name;
  }

  borrowBook(BookCopy: BookCopy): void {
    if (this.borrowedBookCopies.length >= 3) {
      throw new Error(
        'You have reached the maximum number of books you can borrow',
      );
    }

    BookCopy.borrow();
    this.borrowedBookCopies.push(BookCopy);
  }

  returnBook(BookCopyId: string) {
    this.borrowedBookCopies = this.borrowedBookCopies.filter(
      (b) => b.id != BookCopyId,
    );
  }

  getBorrowBooks(): BookCopy[] {
    return this.borrowedBookCopies;
  }
}

class BookRecord {
  id: string;
  issuedDate: Date;
  returnDate: Date | null;

  constructor(
    private userId: string,
    private BookCopyId: string,
  ) {
    this.id = crypto.randomUUID();
    this.issuedDate = new Date();
    this.returnDate = null;
  }

  getIssuedDate(): Date | null {
    return this.issuedDate;
  }

  setReturnDate(returnDate: Date): void {
    this.returnDate = returnDate;
  }
}

class LibraryOrchestrator {
  private books: Book[] = [];
  private bookCopies: BookCopy[] = [];
}
