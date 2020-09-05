import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions: Transaction[] = this.all();

    const outcome = transactions.reduce(
      (acumullator, actualValue) =>
        actualValue.type === 'outcome'
          ? acumullator + actualValue.value
          : acumullator,
      0,
    );
    const income = transactions.reduce(
      (acumullator, actualValue) =>
        actualValue.type === 'income'
          ? acumullator + actualValue.value
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

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    const { total } = this.getBalance();

    if (type === 'outcome' && value > total)
      throw Error('No valid balance outcome');

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
