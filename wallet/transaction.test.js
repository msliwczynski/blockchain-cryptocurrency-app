const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
  let transaction, wallet, recipient, amount;
  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = 'r4cwq31tn';
    transaction = Transaction.newTransaction(wallet, recipient, amount);
    console.log(transaction);

  });

  it('outputs the `amount` substracted from the wallet balance', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
      .toEqual(wallet.balance - amount);
  })

  it('outputs the `amount` added to the recipient', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount)
      .toEqual(amount);
  })

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  })

  describe('transacting with an amount that exceeds the balance', () => {
    beforeEach(() => {
      amount = 5000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    })

    it('does not create the transaction', () => {
      expect(transaction).toEqual(undefined);
    })
  })
})