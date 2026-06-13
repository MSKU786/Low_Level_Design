

class BankAccount {
  public readonly id: string;
  public readonly ownerName: string;
  public readonly createdAt: Date; 
  private _balance: number;
  private _transactions: Transaction[];
  private _overdraftLimit: number;
  private _frozen: boolean;

  constructor(id: string, owner: string) {
    this.id = id;
    this.ownerName = owner;
    this.createdAt = new Date();
    this._balance = 0;
    this._transactions = [];
    this._overdraftLimit = 0;
    this._frozen = false;
  }


  // Behaviours enforces rules not just set values

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    if (this._frozen) throw new Error("Account is frozen")

    this._balance += amount;
    this._transactions.push({
      type: "deposit",
      amount,
      date: new Date()
    })
  }


  withdraw(amount: number) : void {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    if (this._frozen) throw new Error("Account is frozen")

    if (amount > this._balance + this._overdraftLimit) {
      throw new Error("Insufficient Balance")
    }
    this._balance -= amount;
    this._transactions.push({
      type: "withdrawl",
      amount,
      date: new Date()
    })

  }

  freeze(): void {
    this._frozen = true;
  }

  unfreeze(): void {
    this._frozen = false;
  }


  get balance(): number {
    return this._balance;
  }

  get transactions(): readonly Transaction[] {
    return [...this._transactions]
  }

  get isFrozen() : boolean {
    return this._frozen
  }

  get availableBalance(): number {
    return this._balance + this._overdraftLimit;
  }

  get transactionsCount(): number {
    return this._transactions.length;
  }
}