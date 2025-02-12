class ChocolateBoiler {
  private empty: boolean;
  private boiled: boolean;

  private static uniqueStance: ChocolateBoiler | null;

  private constructor() {
    this.empty = true;
    this.boiled = false;
  }

  static getInstance(): ChocolateBoiler {
    if (this.uniqueStance == null) {
      this.uniqueStance = new ChocolateBoiler();
    }
    return this.uniqueStance;
  }

  fill() {
    if (this.isEmpty()) {
      this.empty = false;
      this.boiled = false;
    }
  }

  drain() {
    if (!this.isEmpty() && this.isBoiled()) {
      this.empty = true;
    }
  }

  boil() {
    if (!this.isEmpty() && !this.isBoiled()) {
      this.boiled = true;
    }
  }

  isEmpty(): boolean {
    return this.empty;
  }

  isBoiled(): boolean {
    return this.boiled;
  }
}
