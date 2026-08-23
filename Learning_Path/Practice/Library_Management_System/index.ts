class Book {
  private title: string;
  private publicationYear: number;
  private author: string;

  constructor(title: string, author: string, publicationYear: number) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
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

  getIdCard(): string {
    return this.idCard;
  }
}

class BorrowRecord {
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

  borrowBook(keyword: string, user: User): void {
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

    const borrow_record = new BookRecord(user.getIdCard(), copy.getId());
    copy.borrow();
    user.borrowBook(copy);

    return borrow_record;
  }
}
