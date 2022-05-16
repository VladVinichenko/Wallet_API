const { Transaction } = require('../../models/finance');

async function getAllTransactionData({ limit, page }, user) {
  const { docs: transition, ...rest } = await Transaction.paginate(
    { owner: user.id },
    { limit, offset: page },
  );
  return { transition, ...rest };
}
async function getTotalValue(user) {
  const data = await Transaction.find({ owner: user.id });
  return data[data.length - 1];
}

module.exports = {
  getAllTransactionData,
  getTotalValue,
};
