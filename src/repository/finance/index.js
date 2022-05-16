const { Transaction } = require('../../models/finance');

async function getAllTransactionData({ limit, page }, user) {
  const { docs: transition, ...rest } = await Transaction.paginate(
    { owner: user._id },
    { sort: { data: -1 }, limit, offset: page },
  );
  return { transition, ...rest };
}
async function getTotalValue(user) {
  const data = await Transaction.find({ owner: user._id }, { total: 1 })
    .sort({
      data: -1,
    })
    .limit(1);

  return data;
}

module.exports = {
  getAllTransactionData,
  getTotalValue,
};
