class VendingMachineContext {
  state: State;

  setState(state: State) {}

  request(): void;
}

class Order {
  product: Product;
  quantity: number;
  recievedAmount: number;
  returnAmount: number;

  addAmount(amount: number): void {
    this.recievedAmount += amount;
  }
}

enum MACHINE_STATES {
  IDLE,
  PICK_PRODUCT,
  ACCEPT_MONEY,
  CANCEL_ORDER,
}

interface State {
  handleRequest(): void;
}

class ReadyState implements State {
  handleRequest(): void {}
}

class ProductSelectedState implements State {
  handleRequest(): void {}
}

class PaymentPendingState implements State {
  handleRequest(): void {}
}

class OutofStockState implements State {
  handleRequest(): void {}
}
