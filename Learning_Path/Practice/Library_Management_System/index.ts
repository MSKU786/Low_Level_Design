class Book {
  private title: string;
  private publicationYear: number;
  private author: string;
  private totalCopies: number;
  private availableCopies: number;

  copies: BookCopy[] = [];

  constructor(
    title: string,
    author: string,
    publicationYear: number,
    copies: BookCopy[],
  ) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.copies = copies;
    this.totalCopies = copies.length;
    this.availableCopies = copies.length;
  }

  getTitle(): string {
    return this.title;
  }

  getPublicationYear(): number {
    return this.publicationYear;
  }

  getAuthor(): string {
    return this.author;
  }

  addCopy(copy: BookCopy): void {
    this.copies.push(copy);
    this.totalCopies++;
    this.availableCopies++;
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

  getBook() {
    return this.book;
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

  getId() {
    return this.id;
  }
}

class User {
  private name: string;
  private email: string;
  private id: string;
  private borrowedBookCopies: BookCopy[] = [];

  constructor(name: string, emeail: string, id: string) {
    this.name = name;
    this.email = emeail;
    this.id = id;
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

  getid(): string {
    return this.id;
  }
}

class BorrowRecord {
  id: string;
  issuedDate: Date;
  returnDate: Date | null;

  constructor(
    private userId: string,
    private bookCopyId: string,
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

  getBookCopyId() {
    return this.bookCopyId;
  }

  getUserId(): string {
    return this.userId;
  }
}

class LibraryOrchestrator {
  private books: Book[] = [];
  private bookCopies: BookCopy[] = [];
  private Users: User[] = [];
  private borrowRecords: BorrowRecord[] = [];

  searchBook(keyword: string): Book | null {
    return (
      this.books.find(
        (b) =>
          b.getTitle().includes(keyword) ||
          b.getPublicationYear() == parseInt(keyword) ||
          b.getAuthor().includes(keyword),
      ) || null
    );
  }

  borrowBook(keyword: string, user: User): BorrowRecord | null {
    const book = this.searchBook(keyword);

    if (!book) {
      throw new Error('No book found with the keyword');
    }

    const copy = this.bookCopies.find(
      (copy) => copy.getBook() == book && copy.checkAvailablity(),
    );

    if (!copy) {
      throw new Error('No Copy found with the keyword');
    }

    if (user.getBorrowBooks().length < 3) {
      throw new Error('User already exceeds the borrow limit');
    }

    const borrow_record = new BorrowRecord(user.getid(), copy.getId());
    copy.borrow();
    user.borrowBook(copy);

    return borrow_record;
  }

  returnBook(borrowRecord: BorrowRecord): number {
    let fine = 0;

    const bookCopy = this.bookCopies.find(
      (book) => book.getId() === borrowRecord.getBookCopyId(),
    );

    if (!bookCopy) {
      throw new Error('Book Copy not found');
    }

    const user = this.Users.find(
      (user) => user.getid() === borrowRecord.getUserId(),
    );

    if (!user) {
      throw new Error('User not found');
    }

    if (borrowRecord.getReturnDate() !== null) {
      throw new Error('Book Already returned');
    }

    bookCopy.return();
    user.returnBook(bookCopy.getBook());
    borrowRecord.setReturnDate(new Date());
    return fine;
  }
}
