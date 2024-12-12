/*

State Design Patter

*/

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
  RefundMoney(machine: VendingMachine): []Coin;
  UpdateInventory(machine: VendingMachine, item: Item, code: Number): void;
}

class IdleState implements State{

  constructor (machine : VendingMachine) {
    console.log("Currently vending machine is inidle state");
    machine.setCoinList(new Array());
  }


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

class VendingMachine {}
