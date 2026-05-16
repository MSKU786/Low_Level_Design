// =========================
// STRATEGY INTERFACES
// =========================

interface BonusStrategy {
  calculateBonus(baseSalary: number): number;
}

interface PaymentStrategy {
  calculatePay(baseSalary: number): number;
}

interface PerksStrategy {
  getPerks(): string[];
}

// =========================
// BONUS STRATEGIES
// =========================

class NoBonusStrategy implements BonusStrategy {
  calculateBonus(baseSalary: number): number {
    return 0;
  }
}

class PercentageBonusStrategy implements BonusStrategy {
  constructor(private percent: number) {}

  calculateBonus(baseSalary: number): number {
    return baseSalary * this.percent;
  }
}

class ManagerBonusStrategy implements BonusStrategy {
  constructor(
    private percent: number,
    private teamSize: number
  ) {}

  calculateBonus(baseSalary: number): number {
    return (baseSalary * this.percent) + (this.teamSize * 500);
  }
}

// =========================
// PAYMENT STRATEGIES
// =========================

class FullTimePaymentStrategy implements PaymentStrategy {
  calculatePay(baseSalary: number): number {
    return baseSalary;
  }
}

class HourlyPaymentStrategy implements PaymentStrategy {
  constructor(private hoursWorked: number) {}

  calculatePay(baseSalary: number): number {
    return baseSalary * this.hoursWorked;
  }
}

class InternPaymentStrategy implements PaymentStrategy {
  calculatePay(baseSalary: number): number {
    return baseSalary * 0.5;
  }
}

// =========================
// PERKS STRATEGIES
// =========================

class NoPerksStrategy implements PerksStrategy {
  getPerks(): string[] {
    return [];
  }
}

class FullTimePerksStrategy implements PerksStrategy {
  getPerks(): string[] {
    return [
      "health_insurance",
      "retirement_401k",
      "paid_vacation"
    ];
  }
}

class ManagerPerksStrategy implements PerksStrategy {
  getPerks(): string[] {
    return [
      "health_insurance",
      "retirement_401k",
      "paid_vacation",
      "company_car",
      "stock_options"
    ];
  }
}

class InternPerksStrategy implements PerksStrategy {
  getPerks(): string[] {
    return ["health_insurance"];
  }
}

// =========================
// EMPLOYEE
// =========================

class Employee {
  constructor(
    public name: string,
    public baseSalary: number,
    private paymentStrategy: PaymentStrategy,
    private bonusStrategy: BonusStrategy,
    private perksStrategy: PerksStrategy
  ) {}

  calculatePay(): number {
    return this.paymentStrategy.calculatePay(this.baseSalary);
  }

  calculateBonus(): number {
    return this.bonusStrategy.calculateBonus(this.baseSalary);
  }

  getPerks(): string[] {
    return this.perksStrategy.getPerks();
  }
}

// =========================
// FULL TIME MANAGER
// =========================

const fullTimeManager = new Employee(
  "Manish",
  100000,
  new FullTimePaymentStrategy(),
  new ManagerBonusStrategy(
    0.1,
    5
  ),

  new ManagerPerksStrategy()
);

console.log(fullTimeManager.calculatePay());
console.log(fullTimeManager.calculateBonus());
console.log(fullTimeManager.getPerks());

// =========================
// CONTRACT EMPLOYEE
// =========================

const contractEmployee = new Employee(
  "Rahul",
  1000,

  new HourlyPaymentStrategy(160),

  new NoBonusStrategy(),

  new NoPerksStrategy()
);

console.log(contractEmployee.calculatePay());
console.log(contractEmployee.calculateBonus());
console.log(contractEmployee.getPerks());