interface BonusStrategy{
  payBonus(empolyee: Employee): number
}

interface PaymentStrategy {
  calculatePay(employee: Employee): number
}

interface PerksStrategy {
  getPerks(employee: Employee): string[];
}


class DefaultBonusStrategy implements BonusStrategy{
  payBonus(emplyee: Employee): number {
    return 0;
  }
}

class PercentageBonusStrategy implements BonusStrategy {
  constructor(private percent: number) {}
  payBonus(employee: Employee): number {
    return this.percent * employee.baseSalary;
  }
}




class DefaultPaymentStrategy implements PaymentStrategy {
  calculatePay(employee: Employee) {
    return employee.baseSalary;
  }
}

class PercentagePaymentStrategy implements PaymentStrategy {
  constructor(private percent: number) {

  }
  calculatePay(employee: Employee): number {
    return employee.baseSalary * this.percent;
  }
}


class ManagerPaymentStrategy implements PaymentStrategy {
  constructor(private percent: number, privatefixAmount) {

  }
  calculatePay(employee: Employee): number {
    return employee.baseSalary*this.percent + employee.teamSize * 500;
  }
}



