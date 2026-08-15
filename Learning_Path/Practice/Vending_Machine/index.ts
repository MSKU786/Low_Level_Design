class VendingMachine {}

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
  updateState(): void;
  pickProduct(product): void;
  acceptMoney(amount: number): void;
  cancelOrder(): void;
}



class ProductPicker implements State {
  updateState(): void {
    
  }

  pickProduct(product: any): void {
    
  }

  acceptMoney(amount: number): void {
    return;
  }

  cancelOrder(): void {
    return;
  }
}


class InsertMoney implements State {
  updateState(): void {
    this.state = 
  }

  pickProduct(product: any): void {
    return;
  }

  acceptMoney(amount: number): void {
    
  }

  cancelOrder(): void {
    this.updateState();
  }
}