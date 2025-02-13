enum ChocolateBoiler {
  INSTANCE;

  private empty1: boolean;
  private boiled1: boolean;

  constructor() {
    this.empty1 = true;
    this.boiled1 = false;
  }

  function fill(): void {
    if (this.isEmpty1()) {
      this.empty1 = false;
      this.boiled1 = false;
      console.log("Filling the boiler...");
    }
  }

  function drain(): void {
    if (!this.isEmpty1() && this.isBoiled1()) {
      this.empty1 = true;
      console.log("Draining the boiler...");
    }
  }

  function boil(): void {
    if (!this.isEmpty1() && !this.isBoiled1()) {
      this.boiled1 = true;
      console.log("Boiling the mixture...");
    }
  }

  function isEmpty1(): boolean {
    return this.empty1;
  }

  function isBoiled1(): boolean {
    return this.boiled1;
  }
}

ChocolateBoiler.INSTANCE.fill();
ChocolateBoiler.INSTANCE.boil();
ChocolateBoiler.INSTANCE.drain();