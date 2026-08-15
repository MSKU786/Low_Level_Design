class VendingMachine {}

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
