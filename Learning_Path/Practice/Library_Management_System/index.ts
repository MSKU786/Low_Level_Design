class Book {
  private title: string;
  private publicationYear: string;
  private author: string;
  copiesAvailable: number;

  constructor
}

class BookCOpy {
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

  private setAvailablity(isAvailble: boolean) : void {
    this.isAvailble = isAvailble;
  }

  borrow(): void {
    this.setAvailablity(false);
  }

  return(): void {
    this.setAvailablity(true)
  }
}


class User {
  private name: string;
  private email: string;
  private idCard: string;
  private borrowedBookCopies: BookCOpy[] = [];

  constructor(name: string, emeail: string, idCard: string) {
    this.name = name;
    this.email = emeail;
    this.idCard = idCard
  }

  getName(): string {
    return this.name;
  }

  borrowBook(bookCOpy: BookCOpy) : void {
    if (this.borrowedBookCopies.length >=3 ) {
      throw new Error("You have reached the maximum number of books you can borrow")
    }

    bookCOpy.borrow();
    this.borrowedBookCopies.push(bookCOpy);
  
  }


  returnBook(bookCopyId: string) {
    this.borrowedBookCopies = this.borrowedBookCopies.filter(b => b.id != bookCopyId) ;
  }

  getBorrowBooks(): BookCOpy[] {
    return this.borrowedBookCopies;
  }
}


class BookRecord {
  id: string;
  issueDate: string;
  constructor(private userId: string, private bookCopyId: string) {
    this.issueDate = Date.now();

  }
}