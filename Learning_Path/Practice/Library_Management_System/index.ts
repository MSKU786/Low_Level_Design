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

  
}