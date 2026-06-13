// No protection - any1 can corrupt the state

class BankAccount {
  id: string
  ownerName: string; 
  balance: number;
  transactionsId: Transaction[];
  overdraftLimit: number;
  frozen: boolean;

  constructor(id: string, name: string) {
    this.id = id;
    this.ownerName = name; 
    this.balance = 0;
    this.transactionsId = []
    this.overdraftLimit = 0; 
    this.frozen = false;
  }
}


const acc = new BankAccount("1", "RahuL")
acc.balance = -8922 // Negative Balance
acc.transactionsId = [] // erased history
acc.frozen = false // unfroze theselves 
acc.id = 'hacked' // changed identity 
acc.overdraftLimit = 100000 // gave themselves credit 

