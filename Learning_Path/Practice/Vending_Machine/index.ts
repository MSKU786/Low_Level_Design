class Order {
  product: Product;
  quantity: number;
  amountPaid: number;

  constructor(product: Product, quanity: number) {
    this.product = product;
    this.quantity = quanity
    this.amountPaid = 0;
  }

  addAmount(amount: number): void {
    this.amountPaid += amount;
  }
}

interface State {
  selectProduct(machine: VendingMachine, productId: string, quantity: number): void ;
  insertMoney(machine: VendingMachine, amount: number): void;
  cancelTransaction(machine: VendingMachine): void;
}

class IdleState implements State {
  selectProduct(machine: VendingMachine, productId: string, quantity: number): void {
    const product = machine.products.find(p => p.id === productId);
    if (!product) {
      throw new Error("Product not found")
    }
    console.log(`Select ${product.name} ${quantity} times`)
    machine.order =  new Order(product, quantity);
    machine.setState(new AcceptMoneyState() )
  }

  insertMoney(machine: VendingMachine, amount: number): void {
    throw new Error("Invalid action")
  }

  cancelTransaction(machine: VendingMachine): void {
    machine.cancelOrder();
  }
}


class AcceptMoneyState implements State {
  selectProduct(machine: VendingMachine, productId: string, quantity: number): void {
    throw new Error("Wrong actions")
  }

  insertMoney(machine: VendingMachine, amount: number): void {
    console.log(`Inserted ${amount} dollars`);
    machine.order!.amountPaid += amount;
    if (machine.order!.amountPaid + amount > machine.order!.product.price * machine.order!.quantity) {
      machine.processOrder();
    }
  }

  cancelTransaction(machine: VendingMachine): void {
    machine.cancelOrder();
  }
}





class VendingMachine {
  private state: State;
  products: Product[] = [];
  order: Order | null = null;

  constructor(products: Product[]) {
    this.products = products;
    this.state = new IdleState();
  }

  selectProduct(productId: string, quantity: number) {
    this.state.selectProduct(this, productId, quantity);
  }

  insertMoney(amount: number) {
    this.state.insertMoney(this, amount);
  }

  processOrder(): void {
    if (this.order!.amountPaid < this.order!.product.price * this.order!.quantity {
      throw new Error("Insufficient Funds");
    }

    console.log(`Dispensing ${this.order!.product.name} ${this.order!.quantity} times`);
    this.order!.amountPaid -= this.order!.product.price * this.order!.quantity;
    this.order = null;
    this.setState(new IdleState());
    
  }

  setState(state: State) {
    this.state = state;
  }

  cancelOrder(): void {
    console.log(`Transaction cancelled`)
    this.issueRefund();
    this.order = null;
    this.setState(new IdleStte());
  }

  private issueRefund() : void {
    console.log(`Refunded ${this.order!.amountPaid} Dollars`)
    this.order!.amountPaid = 0;
  }
}

const machine = new VendingMachine();

machine.setProduct();
machine.insertMoney();
machine.insertMoney();
machine.dispenseAndRefund();
