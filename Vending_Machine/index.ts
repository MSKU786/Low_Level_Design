/*

State Design Patter

*/

interface product {
  code: Number;
  price: Number;
}

interface state {
  PressInsertCoinButton(machine: VendingMachine): void;
  PrssProductSelectionBUtton(machine: VendingMachine): void;
  InsertCoin(machine: VendingMachine, coin: Coin): void;
  ChooseProduct(machine: VendingMachine, code: Number): void;
  GetChange(machine: VendingMachine): number;
  DispatchProduct(machine: VendingMachine, code: Number): Item;
  RefundMoney(machine: VendingMachine): []Coin;
  UpdateInventory(machine: VendingMachine, item: Item, code: Number): void;
}

class VendingMachine {}
