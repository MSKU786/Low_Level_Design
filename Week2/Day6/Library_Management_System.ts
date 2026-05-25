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


interface HasId {
  readonly id: string
}

interface Repository<T extends HasId> {
  save(item: T): void;
  update(item: T): void;
  findById(id: string): T | null
  findAll(): T[];
  delete(id: string): boolean;
}


class InMemoryRepository<T extends HasId> implements Repository<T> {
  private store = new Map<string, T>();

  save(item: T): void {
    this.store.set(item.id, item);
  }

  findById(id: string): T | null {
    return this.store.get(id) ?? null;
  }

  findAll(): T[] {
    return [...this.store.values()]
  }

  update(item: T): void {
    this.store.set(item.id, item)
  }

  delete(id: string): boolean {
    return this.store.delete(id);
  }
}


// Reservation QUeue

class ReservationQueue<T> {
  private queues = new Map<string, T[]>();

  enquue(itemId: string, entry: T): void {
    const queue = this.queues.get(itemId) ?? [];
    queue.push(entry);
    this.queues.set(itemId, queue);
  }

  dequeue(itemId: string) : T | null {
    const queue = this.queues.get(itemId);
    if (!queue || queue.length === 0) return null;
    return queue.shift()!;
  }

  remove(itemId: string, predicate: (entry: T) => boolean) : boolean {
    const queue = this.queues.get(itemId);
    if (!queue) return false;
    const index = queue.findIndex(predicate);
    if (index === -1) return false;
    queue.splice(index, 1);
    return true;
  }

  hasReservations(itemId: string) : boolean {
    const queue = this.queues.get(itemId);
    return !!queue && queue.length > 0;
  }
}


interface Reservation {
  memberId: string;
  reservedAt: Date;
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



// Member Class

class Member {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly phone: string;
  private _policy: BorrowingPolicy;
  private _activeLoans: Set<string> = new Set();

  constructor(
    id: string,
    name: string, 
    email: string,
    phone: string,
    policy: BorrowingPolicy
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.phone = phone,
    this._policy = policy;
  }

  get policy(): BorrowingPolicy {
    return this._policy;
  }

  get activeLoanCount(): number {
    return this._activeLoans.size;
  }

  canBorrow(): boolean {
    return this._activeLoans.size < this._policy.maxItems;
  }

  addLoan(loanId: string) : void {
    if (!this.canBorrow()) {
      throw new Error("Member capacity exhausted")
    }
    this._activeLoans.add(loanId);
  }

  removeLoan(loanId: string) : void {
    this._activeLoans.delete(loanId)
  }
}




// LOan (heavily encapusulated - protects due dueate, fine status)

class Loan {
  public readonly id: string;
  public readonly itemId: string;
  public readonly memberId: string;
  public readonly borrowDate: Date;
  public readonly dueDate: Date;
  private _returnDate: Date|null = null ;
  private _fine: number = 0;
  private _status : LoanStatus = LoanStatus.Active;

  constructor(
    id: string,
    itemId: string,
    memberId: string,
    loanDurationDays: number 
  ) {
    this.id = id;
    this.itemId = itemId;
    this.memberId = memberId;
    this.borrowDate = new Date();
    this.dueDate = new Date(Date.now() + loanDurationDays * 24 * 60 * 60 * 1000);
  }

  get returnDate(): Date | null { 
    return this._returnDate
  }

  get fine(): number {
    return this._fine;
  }

  get status(): LoanStatus {
    return this._status;
  }

  get isOverdue(): boolean {
    const compareDate = this._returnDate ?? new Date();
    return compareDate > this.dueDate
  }

  get daysOverDue(): number {
    if (!this.isOverdue) return 0;
    const compareDate = this._returnDate ?? new Date();
    const diff = compareDate.getTime() - this.dueDate.getTime();
    return Math.ceil(diff / (24 * 3600 * 1000));
  }

  markReturned(fine: number): void {
    if (this._status !== LoanStatus.Active) {
      throw new Error(`Invalid status`)
    }

    this._returnDate = new Date();
    this._fine = fine; 
    this._status = LoanStatus.Returned;
  }

  markOverdue(): void {
    if (this._status === LoanStatus.Active) {
      this._status = LoanStatus.Overdue;
    }
  }
}


// Fine Strategy 

interface FineStrategy {
  calculate(daysOverDue: number): number;
}

class BookFine implements FineStrategy {
  calculate(daysOverDue: number): number {
    return daysOverDue*2;
  }
}


class DVDFine implements FineStrategy {
  calculate(daysOverDue: number): number {
    return daysOverDue*5;
  }
}


// REgistry maps item type -> fine strategy
// Adding a new Item type = add one entry here. Nthing else change

class FineRegistry {
  private strategies = new Map<string, FineStrategy>();

  register(itemType: string, strategy: FineStrategy): void {
    this.strategies.set(itemType, strategy);
  }

  getStrategy(itemType: string): FineStrategy {
    const strategy = this.strategies.get(itemType);
    if (!strategy) 
      throw new Error("No fine strategy found")
    return strategy;
  }
}



// Search Service


class SearchService {
  constructor(private itemRepo: Repository<LibraryItem>) {}

  searhByText(query: stirng): LibraryItem[] {

  }

  searchByYear(year: number): LibraryItem[] {

  }

  getAvailable(): LibraryItemp[] {
    return (this.itemRepo as InMemoryRepository<LibraryItem>).findWhere(item => item.isAvailable);
  }
}
class BorrowService {
  constructor(
    private itemRepo: Repository<LibraryItem>,
    private loanRepo: InMemoryRepository<Loan>,
    private memberRepo: Repository<Member>,
    private notifier: Notifier,
  ) {}

  async borrowBook(memberId: string, itemId:string): Promise<Loan> {

    const member = this.memberRepo.findById(memberId);
    if (!member) throw new Error(`Member ${memberId} not found`);

    const item = this.itemRepo.findById(itemId);
    if (!item) throw new Error(`Item ${itemId} not found`)
    
    // Validate member can borrow
    if (!member.canBorrow()) {
      throw new Error(`${member.name} has reached bowrrowing limit (${member.policy.maxItems})`)
    }

    // 3. Validate itme is available
    if (!item.isAvailable) {
      throw new Error(`${item.title} is currently borrowed`)
    }

    // 4. Create loan with due date from member's policy
    const loan = new Loan(
      `loan_${Date.now()}`,
      itemId,
      memberId,
      member.policy.loanDurationDays
    );

    // 5. Mark item as borrowed + add loan to member
    item.markBorrowed();
    member.addLoan(loan.id);

    // Save
    this.loanRepo.save(loan);

    // Notify
    await this.notifier.send(member, loan);

    return loan;
  }
}



// Return Service 

class ReturnService {
  constructor(
    private itemRepo: Repository<LibraryItem>,
    private loanRepo: InMemoryRepository<Loan>,
    private memberRepo: Repository<Member>,
    private fineRegistry: FineRegistry,
    private reservations: ReservationQueue<Reservation>,
    private Notifier: Notifier,
  ) {}

  async returnItem(loanId: string): Product<{loan: Loan; fine: number}> {

    // 1. Find the active loan
    const loan = this.loanRepo.findById(loanId);
    if (!loan) throw new Error(`LOan ${loanId} not found`);

    if (loan.status !== LoanStatus.Active && loan.status !== LoanStatus.Overdue) {
      throw new Error(`Loan ${loanId} is already ${loan.status}`)
    }

    // 2. find the item and member
    const item = this.itemRepo.findById(loan.itemId);
    if (!item) throw new Error(`Item ${loan.itemId} not found`);

    const member = this.memberRepo.findById(loan.memberId);
    if (!member) throw new Error(`Member ${loan.memberId} not found`)

    // 3. calculate fine
    const findStrategy = this.fineRegistry.getStrategy(item.itemType);
    const fine = loan.isOverdue ? findStrategy.calculate(loan.daysOverDue) : 0;

    loan.markReturned(fine);

    item.markReturned();

    member.removeLoan(loanId);

    // 7 Ccheck reserveration queue

    if (this.reservations.hasReservations(item.id)) {
      const nextReservations = this.reservations.dequeue(item.id);
      if (nextReservations) {
        const nextMember = this.memberRepo.findById(nextReservations.memberId);
        if (nextMember) {
          await this.Notifier.send(msg);
        }
      }
    }
  }

  // Save 
  this.loanRepo.update(loan);

  // 9. Notify member
  await this.Notifier.send();

  return {loan,fine};

}
