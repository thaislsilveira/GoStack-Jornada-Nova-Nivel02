import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find({ select: ['type', 'value'] });

    const outcome = transactions.reduce(
      (acumullator, actualValue) =>
        actualValue.type === 'outcome'
          ? acumullator + Number(actualValue.value)
          : acumullator,
      0,
    );
    const income = transactions.reduce(
      (acumullator, actualValue) =>
        actualValue.type === 'income'
          ? acumullator + Number(actualValue.value)
          : acumullator,
      0,
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
