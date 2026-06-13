// You're building an HR system. The current design uses deep inheritance.

class Employee {
  constructor(
    public name: string,
    public baseSalary: number
  ) {}

  calculatePay(): number {
    return this.baseSalary;
  }

  getPerks(): string[] {
    return ["health_insurance"];
  }

  getBonus(): number {
    return 0;
  }
}

class FullTimeEmployee extends Employee {
  calculatePay(): number {
    return this.baseSalary;
  }

  getPerks(): string[] {
    return [
      "health_insurance",
      "retirement_401k",
      "paid_vacation"
    ];
  }

  getBonus(): number {
    return this.baseSalary * 0.1;
  }
}

class ContractEmployee extends Employee {
  constructor(
    name: string,
    baseSalary: number,
    public hoursWorked: number
  ) {
    super(name, baseSalary);
  }

  calculatePay(): number {
    return this.baseSalary * this.hoursWorked;
  }

  getPerks(): string[] {
    return [];
  }

  getBonus(): number {
    return 0;
  }
}

class FullTimeManager extends FullTimeEmployee {
  constructor(
    name: string,
    baseSalary: number,
    public teamSize: number
  ) {
    super(name, baseSalary);
  }

  getBonus(): number {
    return this.baseSalary * 0.1 + this.teamSize * 500;
  }

  getPerks(): string[] {
    return [
      ...super.getPerks(),
      "company_car",
      "stock_options"
    ];
  }
}

class ContractManager extends ContractEmployee {
  constructor(
    name: string,
    baseSalary: number,
    hoursWorked: number,
    public teamSize: number
  ) {
    super(name, baseSalary, hoursWorked);
  }

  getBonus(): number {
    return this.teamSize * 300;
  }

  getPerks(): string[] {
    return ["stock_options"];
  }
}

class FullTimeIntern extends Employee {
  calculatePay(): number {
    return this.baseSalary * 0.5;
  }

  getPerks(): string[] {
    return ["health_insurance"];
  }

  getBonus(): number {
    return 0;
  }
}

/*
Your task: Refactor this to composition.

Specifically:

1. Identify the three axes that vary independently
   - Pay calculation
   - Perks
   - Bonus calculation

2. Define a strategy interface for each axis.

3. Create concrete implementations for each flavor.

4. Redesign Employee so it composes these strategies
   instead of inheriting behavior.

5. Show how you'd construct:
   - a FullTimeManager
   - a ContractEmployee

using your new design.
*/