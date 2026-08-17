class Order {
  product: Product;
  quantity: number;
  recievedAmount: number;
  returnAmount: number;

  addAmount(amount: number): void {
    this.recievedAmount += amount;
  }
}

interface State {
  setProduct(position: number, quantity: number): Order;
  moneyInserted(amount: number): void;
  cancelOrder(): void;
  dispenseAndRefund(): void;
}

class ReadyStatee implements State {
  setProduct(position: number, quantity: number): Order {
    return new Order();
  }

  moneyInserted(amount: number): void {
    throw new Error('Wrong Action');
  }

  cancelOrder(): void {
    throw new Error('Wrong Action');
  }

  dispenseAndRefund(): void {
    throw new Error('Wrong Action');
  }
}

class ProductSelectedState implements State {
  setProduct(position: number, quantity: number): Order {
    return new Order();
  }

  moneyInserted(amount: number): void {
    throw new Error('Wrong Action');
  }

  cancelOrder(): void {
    throw new Error('Wrong Action');
  }

  dispenseAndRefund(): void {
    throw new Error('Wrong Action');
  }
}

class PaymentPendingState implements State {
  setProduct(position: number, quantity: number): Order {
    return new Order();
  }

  moneyInserted(amount: number): void {
    throw new Error('Wrong Action');
  }

  cancelOrder(): void {
    throw new Error('Wrong Action');
  }

  dispenseAndRefund(): void {
    throw new Error('Wrong Action');
  }
}

class OutofStockState implements State {
  setProduct(position: number, quantity: number): Order {
    return new Order();
  }

  moneyInserted(amount: number): void {
    throw new Error('Wrong Action');
  }

  cancelOrder(): void {
    throw new Error('Wrong Action');
  }

  dispenseAndRefund(): void {
    throw new Error('Wrong Action');
  }
}

class VendingMachine {
  state: State;

  constructor() {
    this.state = new ReadyStatee();
  }

  setProduct() {}

  insertMoney() {}

  setState() {}

  cancelOrder() {}

  dispenseAndRefund() {}
}

const machine = new VendingMachine();

machine.setProduct();
machine.insertMoney();
machine.insertMoney();
machine.dispenseAndRefund();
