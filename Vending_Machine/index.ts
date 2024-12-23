class Coin {
  static PENNY = new Coin(1);
  static NICKEL = new Coin(5);
  static DIME = new Coin(10);
  static QUARTER = new Coin(25);

  private constructor(public readonly value: number) {}
}

interface State {
  PressInsertCoinButton(machine: VendingMachine): void;
  PressProductSelectionButton(machine: VendingMachine): void;
  InsertCoin(machine: VendingMachine, coin: Coin): void;
  ChooseProduct(machine: VendingMachine, code: number): void;
  GetChange(machine: VendingMachine): number;
  DispatchProduct(machine: VendingMachine, code: number): Item | null;
  RefundMoney(machine: VendingMachine): Coin[];
  UpdateInventory(machine: VendingMachine, item: Item, code: number): void;
}

class IdleState implements State {
  constructor(machine: VendingMachine) {
    console.log('Currently vending machine is in idle state.');
    machine.setCoinList([]);
  }

  PressInsertCoinButton(machine: VendingMachine): void {
    console.log(
      "Coin insert button pressed. Transitioning to 'HasMoneyState'."
    );
    machine.setMachineState(new HasMoneyState());
  }

  PressProductSelectionButton(machine: VendingMachine): void {
    console.log('Insert coin first.');
  }

  InsertCoin(machine: VendingMachine, coin: Coin): void {
    console.log('Press the insert coin button first.');
  }

  ChooseProduct(machine: VendingMachine, code: number): void {
    console.log('Insert coin first.');
  }

  GetChange(machine: VendingMachine): number {
    console.log('No money to return.');
    return 0;
  }

  DispatchProduct(machine: VendingMachine, code: number): Item | null {
    console.log('No product to dispatch. Insert coin first.');
    return null;
  }

  RefundMoney(machine: VendingMachine): Coin[] {
    console.log('No money to refund.');
    return [];
  }

  UpdateInventory(machine: VendingMachine, item: Item, code: number): void {
    machine.getInventory().addItem(item, code);
    console.log(`Item added to inventory at code ${code}.`);
  }
}

class HasMoneyState implements State {
  constructor() {
    console.log("Currently machine is in 'HasMoneyState'.");
  }

  PressInsertCoinButton(machine: VendingMachine): void {
    console.log('Coin insert button already pressed.');
  }

  PressProductSelectionButton(machine: VendingMachine): void {
    console.log(
      "Product selection button pressed. Transitioning to 'SelectionState'."
    );
    machine.setMachineState(new SelectionState());
  }

  InsertCoin(machine: VendingMachine, coin: Coin): void {
    console.log(`Accepted coin of value: ${coin.value}`);
    machine.addCollectedMoney(coin.value);
    machine.getCoinList().push(coin);
  }

  ChooseProduct(machine: VendingMachine, code: number): void {
    console.log('Press the product selection button first.');
  }

  GetChange(machine: VendingMachine): number {
    console.log('Returning change.');
    const change = machine.getCollectedMoney();
    machine.resetCollectedMoney();
    return change;
  }

  DispatchProduct(machine: VendingMachine, code: number): Item | null {
    console.log('Product cannot be dispatched yet. Select a product first.');
    return null;
  }

  RefundMoney(machine: VendingMachine): Coin[] {
    console.log('Refunding all coins.');
    const coins = [...machine.getCoinList()];
    machine.setCoinList([]);
    machine.resetCollectedMoney();
    machine.setMachineState(new IdleState(machine));
    return coins;
  }

  UpdateInventory(machine: VendingMachine, item: Item, code: number): void {
    console.log("Cannot update inventory while in 'HasMoneyState'.");
  }
}

class SelectionState implements State {
  PressInsertCoinButton(machine: VendingMachine): void {
    console.log('Already in selection mode. Cannot insert more coins.');
  }

  PressProductSelectionButton(machine: VendingMachine): void {
    console.log('Product selection in progress.');
  }

  InsertCoin(machine: VendingMachine, coin: Coin): void {
    console.log('Cannot insert coins during product selection.');
  }

  ChooseProduct(machine: VendingMachine, code: number): void {
    const itemShelf = machine
      .getInventory()
      .getInventory()
      .find((shelf) => shelf.getCode() === code);
    if (!itemShelf || itemShelf.isSoldOut()) {
      console.log('Invalid selection or item sold out.');
      return;
    }

    if (machine.getCollectedMoney() < itemShelf.getItem().price) {
      console.log('Insufficient funds. Insert more coins.');
      return;
    }

    console.log(`Product selected: ${itemShelf.getItem().name}`);
    machine.addCollectedMoney(-itemShelf.getItem().price);
    machine.setMachineState(new DispenseState());
  }

  GetChange(machine: VendingMachine): number {
    console.log('Change cannot be returned during selection.');
    return 0;
  }

  DispatchProduct(machine: VendingMachine, code: number): Item | null {
    console.log('Select product first.');
    return null;
  }

  RefundMoney(machine: VendingMachine): Coin[] {
    console.log('Cannot refund during selection.');
    return [];
  }

  UpdateInventory(machine: VendingMachine, item: Item, code: number): void {
    console.log('Cannot update inventory during selection.');
  }
}

class DispenseState implements State {
  PressInsertCoinButton(machine: VendingMachine): void {
    console.log('Cannot insert coins. Dispensing product.');
  }

  PressProductSelectionButton(machine: VendingMachine): void {
    console.log('Cannot select product. Dispensing product.');
  }

  InsertCoin(machine: VendingMachine, coin: Coin): void {
    console.log('Cannot insert coins. Dispensing product.');
  }

  ChooseProduct(machine: VendingMachine, code: number): void {
    console.log('Cannot choose product. Dispensing product.');
  }

  GetChange(machine: VendingMachine): number {
    const change = machine.getCollectedMoney();
    machine.resetCollectedMoney();
    console.log(`Returning change: ${change}`);
    return change;
  }

  DispatchProduct(machine: VendingMachine, code: number): Item | null {
    const itemShelf = machine
      .getInventory()
      .getInventory()
      .find((shelf) => shelf.getCode() === code);
    if (!itemShelf || itemShelf.isSoldOut()) {
      console.log('Invalid selection or item sold out.');
      return null;
    }

    const item = itemShelf.getItem();
    itemShelf.setSoldOut(true);
    console.log(`Dispensed: ${item.name}`);
    machine.setMachineState(new IdleState(machine));
    return item;
  }

  RefundMoney(machine: VendingMachine): Coin[] {
    console.log('Cannot refund during dispensing.');
    return [];
  }

  UpdateInventory(machine: VendingMachine, item: Item, code: number): void {
    console.log('Cannot update inventory during dispensing.');
  }
}

class Item {
  constructor(public name: string, public price: number) {}
}

class ItemShelf {
  private soldOut: boolean = true;
  private item: Item | null = null;

  constructor(private code: number) {}

  public getCode(): number {
    return this.code;
  }

  public getItem(): Item {
    if (!this.item) {
      throw new Error('No item available.');
    }
    return this.item;
  }

  public isSoldOut(): boolean {
    return this.soldOut;
  }

  public setSoldOut(soldOut: boolean): void {
    this.soldOut = soldOut;
  }

  public setItem(item: Item): void {
    this.item = item;
    this.soldOut = false;
  }
}

class Inventory {
  private inventory: ItemShelf[];

  constructor(itemCount: number) {
    this.inventory = Array.from(
      { length: itemCount },
      (_, i) => new ItemShelf(101 + i)
    );
  }

  public getInventory(): ItemShelf[] {
    return this.inventory;
  }

  public addItem(item: Item, code: number): void {
    const itemShelf = this.inventory.find((shelf) => shelf.getCode() === code);
    if (!itemShelf) {
      throw new Error('Invalid code.');
    }
    if (!itemShelf.isSoldOut()) {
      throw new Error('Shelf is already occupied.');
    }
    itemShelf.setItem(item);
  }
}

class VendingMachine {
  private currentState: State;
  private coinList: Coin[];
  private inventory: Inventory;
  private collectedMoney: number;

  constructor(itemCount: number) {
    this.currentState = new IdleState(this);
    this.coinList = [];
    this.inventory = new Inventory(itemCount);
    this.collectedMoney = 0;
  }

  public setMachineState(state: State): void {
    this.currentState = state;
  }

  public getMachineState(): State {
    return this.currentState;
  }

  public getCoinList(): Coin[] {
    return this.coinList;
  }

  public setCoinList(coinList: Coin[]): void {
    this.coinList = coinList;
  }

  public getInventory(): Inventory {
    return this.inventory;
  }

  public addCollectedMoney(amount: number): void {
    this.collectedMoney += amount;
  }

  public getCollectedMoney(): number {
    return this.collectedMoney;
  }

  public resetCollectedMoney(): void {
    this.collectedMoney = 0;
  }

  public pressInsertCoinButton(): void {
    this.currentState.PressInsertCoinButton(this);
  }

  public pressProductSelectionButton(): void {
    this.currentState.PressProductSelectionButton(this);
  }

  public insertCoin(coin: Coin): void {
    this.currentState.InsertCoin(this, coin);
  }

  public chooseProduct(code: number): void {
    this.currentState.ChooseProduct(this, code);
  }

  public getChange(): number {
    return this.currentState.GetChange(this);
  }

  public dispatchProduct(code: number): Item | null {
    return this.currentState.DispatchProduct(this, code);
  }

  public refundMoney(): Coin[] {
    return this.currentState.RefundMoney(this);
  }

  public updateInventory(item: Item, code: number): void {
    this.currentState.UpdateInventory(this, item, code);
  }
}

// Simulation
const vendingMachine = new VendingMachine(3);
vendingMachine.updateInventory(new Item('Soda', 150), 101);
vendingMachine.updateInventory(new Item('Chips', 75), 102);
vendingMachine.updateInventory(new Item('Candy', 50), 103);

vendingMachine.pressInsertCoinButton();
vendingMachine.insertCoin(Coin.QUARTER);
vendingMachine.insertCoin(Coin.QUARTER);
vendingMachine.insertCoin(Coin.QUARTER);
vendingMachine.insertCoin(Coin.QUARTER);
vendingMachine.pressProductSelectionButton();
vendingMachine.chooseProduct(101);
const dispensedItem = vendingMachine.dispatch();
