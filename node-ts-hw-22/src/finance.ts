
export namespace Finance {
  export class LoanCalculator {
    static calculateMonthlyPayment(
      principal: number,
      annualRate: number,
      months: number
    ): number {
      const r = annualRate / 12 / 100;
      return (
        (principal * r * Math.pow(1 + r, months)) /
        (Math.pow(1 + r, months) - 1)
      );
    }
  }

  export class TaxCalculator {
    static calculateIncomeTax(income: number, taxRate: number): number {
      return (income * taxRate) / 100;
    }
  }
}
