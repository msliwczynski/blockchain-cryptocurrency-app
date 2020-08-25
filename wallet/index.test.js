const Wallet = require('./index')
const TransactionPool = require('./transaction-pool')

describe('Wallet', () => {
  let tp, wallet;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
  })

  describe('creating a transaction', () => {
    let transaction, sendAmount, recipient;

    beforeEach(() => {
      sendAmount = 50;
      recipient = 'r4n0ma-433ddd11';
      transaction = wallet.createTransaction(recipient, sendAmount, tp);
    });

    describe('and doing the same transaction', () => {
      beforeEach(() => {
        wallet.createTransaction(recipient, sendAmount, tp);
      });

      it('doubles the `sendAmount` substracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
          .toEqual(wallet.balance - sendAmount * 2);
      });

      it('clones the `sendAmount` output for the reciepient', () => {
        expect(transaction.outputs.filter(output => output.address === recipient).map(output => output.amount))
          .toEqual([sendAmount, sendAmount]);
      })
    })
  })
});