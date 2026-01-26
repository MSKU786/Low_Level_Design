/*
Low-Level Design: Splitwise Expense Sharing System 💰
A Splitwise-like expense sharing system is designed to efficiently track shared expenses among a group of people, calculate balances, and determine the minimum number of transactions needed to settle all debts. The system needs to handle multiple users, various expense types, and provide an optimal solution for debt settlement. The system should be reliable, maintainable, and provide an intuitive interface for expense management and balance calculation.

‍

Rules of the System:
Setup:

• The system maintains a record of users and their associated transactions.

• Expenses can be split in various ways: equally, percentage-based, or custom amounts.

• The system tracks who owes whom and how much.

‍

Operation:

• Users can add expenses, specifying payers, participants, and split methods.

• The system calculates balances between users after each transaction.

• Users can view their total balance, as well as detailed balances with specific users.

• The system provides a simplified settlement plan with minimal transactions.

‍

Features:

• The system optimizes debt settlement to minimize the number of transactions.

• Transaction history is maintained for auditing purposes.

*/


class User {
  name: string;
  email: string;

  Borrowers: Map<User, Expense>;
  Lenders: Map<User, Expense>;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.Borrowers = new Map();
    this.Lenders = new Map();
  }

}


class Expense {
  id: number;
  amount: number;
}


abstract class ExpenseStaregy {
  calculateExpense(expense: Expense): number {
    return 0;
  }
}


class Transaction {
  id:  number;
  amount:  number;
  date: Date;
  description: string;

}