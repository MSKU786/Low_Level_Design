/*

State Design Patter

*/
class Coin {
  static PENNY = new Coin(1);
  static NICKEL = new Coin(5);
  static DIME = new Coin(10);
  static QUARTER = new Coin(25);

  private constructor(value: number) {
    this.value = value;
  }

  private readonly value: number;
}

interface product {
  code: Number;
  price: Number;
}

interface State {
  PressInsertCoinButton(machine: VendingMachine): void;
  PressProductSelectionButton(machine: VendingMachine): void;
  InsertCoin(machine: VendingMachine, coin: Coin): void;
  ChooseProduct(machine: VendingMachine, code: Number): void;
  GetChange(machine: VendingMachine): number;
  DispatchProduct(machine: VendingMachine, code: Number): Item;
  RefundMoney(machine: VendingMachine): Coin[];
  UpdateInventory(machine: VendingMachine, item: Item, code: Number): void;
}

class SelctionStatee implements State{
  PressInsertCoinButton(machine: VendingMachine): void {
    throw new Error("Method not implemented.");
  }
  PressProductSelectionButton(machine: VendingMachine): void {
    throw new Error("Method not implemented.");
  }
  InsertCoin(machine: VendingMachine, coin: Coin): void {
    throw new Error("Method not implemented.");
  }
  ChooseProduct(machine: VendingMachine, code: Number): void {
    throw new Error("Method not implemented.");
  }
  GetChange(machine: VendingMachine): number {
    throw new Error("Method not implemented.");
  }

  DispatchProduct(machine: VendingMachine, code: Number): Item | null {
    console.log("Method not implemented")
    return null;
  }
  RefundMoney(machine: VendingMachine): Coin[] {
    throw new Error("Method not implemented.");
  }
  UpdateInventory(machine: VendingMachine, item: Item, code: Number): void {
    throw new Error("Method not implemented.");
  }
  
}


class DispenseState implements State{
  PressInsertCoinButton(machine: VendingMachine): void {
    throw new Error("Method not implemented.");
  }
  PressProductSelectionButton(machine: VendingMachine): void {
    throw new Error("Method not implemented.");
  }
  InsertCoin(machine: VendingMachine, coin: Coin): void {
    throw new Error("Method not implemented.");
  }
  ChooseProduct(machine: VendingMachine, code: Number): void {
    throw new Error("Method not implemented.");
  }
  GetChange(machine: VendingMachine): number {
    throw new Error("Method not implemented.");
  }
  DispatchProduct(machine: VendingMachine, code: Number) {
    throw new Error("Method not implemented.");
  }
  RefundMoney(machine: VendingMachine): Coin[] {
    throw new Error("Method not implemented.");
  }
  UpdateInventory(machine: VendingMachine, item: Item, code: Number): void {
    throw new Error("Method not implemented.");
  }

}

class IdleState implements State {
  constructor(machine: VendingMachine) {
    console.log("Currently vending machine is in idle state.");
    machine.setCoinList([]);
  }

  PressInsertCoinButton(machine: VendingMachine): void {
    console.log("Coin insert button pressed. Transitioning to 'HasMoneyState'.");
    machine.setMachineState(new HasMoneyState());
  }

  PressProductSelectionButton(machine: VendingMachine): void {
    console.log("Insert coin first.");
  }

  InsertCoin(machine: VendingMachine, coin: Coin): void {
    console.log("Insert coin button needs to be pressed first.");
  }

  ChooseProduct(machine: VendingMachine, code: Number): void {
    console.log("Insert coin first.");
  }

  GetChange(machine: VendingMachine): number {
    console.log("No money inserted to return.");
    return 0;
  }

  DispatchProduct(machine: VendingMachine, code: Number): Item | null {
    console.log("No product can be dispatched. Insert coin first.");
    return null;
  }

  RefundMoney(machine: VendingMachine): Coin[] {
    console.log("No money to refund.");
    return [];
  }

  UpdateInventory(machine: VendingMachine, item: Item, code: Number): void {
    machine.getInventory().addItem(item, code);
    console.log(`Item added to inventory at code ${code}.`);
  }
}


class HasMoneyState implements State{
  
  constructor() {
    console.log("Currently machine is in hasmoney state")
  }
  PressInsertCoinButton(machine: VendingMachine): void {
    throw new Error("Method not implemented.");
  }
  
  PressProductSelectionButton(machine: VendingMachine): void {
    machine.setMachineState(new SelctionState());
  }
  
  InsertCoin(machine: VendingMachine, coin: Coin): void {
    console.log("Accepted the coin")
    machine.getCoinList().add(coin);
  }

  ChooseProduct(machine: VendingMachine, code: Number): void {
    throw new Error("Method not implemented.");
  }

  GetChange(machine: VendingMachine): number {
    throw new Error("Method not implemented.");
  }

  DispatchProduct(machine: VendingMachine, code: Number) {
    throw new Error("Method not implemented.");
    return null;
  }

  RefundMoney(machine: VendingMachine): [] {
    console.log("Returned the full amount of money in the coin despense tray")\
    machine.setMachineState(new IdleState(machine));
    return machine.getCoinList();
  }
  Coin: any;
  UpdateInventory(machine: VendingMachine, item: Item, code: Number): void {
    throw new Error("Method not implemented.");
  }
  
}


class SelctionState implements State{
  PressInsertCoinButton(machine: VendingMachine): void {
    throw new Error("Method not implemented.");
  }
  PressProductSelectionButton(machine: VendingMachine): void {
    throw new Error("Method not implemented.");
  }
  InsertCoin(machine: VendingMachine, coin: Coin): void {
    throw new Error("Method not implemented.");
  }
  ChooseProduct(machine: VendingMachine, code: Number): void {
    throw new Error("Method not implemented.");
  }
  GetChange(machine: VendingMachine): number {
    throw new Error("Method not implemented.");
  }
  DispatchProduct(machine: VendingMachine, code: Number) {
    throw new Error("Method not implemented.");
  }
  RefundMoney(machine: VendingMachine): [] {
    throw new Error("Method not implemented.");
  }
  Coin: any;
  UpdateInventory(machine: VendingMachine, item: Item, code: Number): void {
    throw new Error("Method not implemented.");
  }
  
}


public class ItemShelf {
    code: Number;
    item: Item;
    soldOut: Boolean

    public getCode(): Number {
      return this.code;
    }

    public setCode(code: Number): void {
        this.code = code;
    }

    public getItem(): Item{
      return this.item;
    }

    public isSoldOut(): Boolean {
      return this.soldOut;
    }

    public setSoldOut(soldOut: boolean) : void {
      this.soldOut = soldOut;
    }
}


public class Inventory{
  inventory : ItemShelf[];

  constructor(itemCount: number) {
    this.inventory = new Array(itemCount);
    this.initialEmptyInventory();
  }

  public getInventory() : ItemShelf[] {
    return this.inventory;
  }

  public setInventory(inventory: ItemShelf[]) {
    this.inventory = inventory;
  }

  public initialEmptyInventory() {
    let startCode = 101;
    for (let i=0; i<this.inventory.length; i++) {
      let space = new ItemShelf();
      space.setCode(startCode);
      space.setSoldOut(true);
      this.inventory[i] = space;
      startCode++;
    }
  }

  public addItem(item : Item ,  codeNumber : number) {
      for (let itemShelf of this.inventory) {
        if (itemShelf.code === codeNumber) {
          if (itemShelf.isSoldOut()) {
            itemShelf.item = item;
            itemShelf.setSoldOut(false)
          } else {
            throw new Error("Already item is Present")
          }
        }
      }
  }
}

class Item {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
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

  public chooseProduct(code: Number): void {
    this.currentState.ChooseProduct(this, code);
  }

  public getChange(): number {
    return this.currentState.GetChange(this);
  }

  public dispatchProduct(code: Number): Item | null {
    return this.currentState.DispatchProduct(this, code);
  }

  public refundMoney(): Coin[] {
    return this.currentState.RefundMoney(this);
  }

  public updateInventory(item: Item, code: Number): void {
    this.currentState.UpdateInventory(this, item, code);
  }
}