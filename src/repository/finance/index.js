const { Finance } = require('../../models');

async function getAllTransactionData({ limit, page }, user) {
  const { docs: transition, ...rest } = await Finance.paginate(
    { owner: user._id },
    { sort: { date: -1 }, limit, offset: page },
  );
  return { transition, ...rest };
}
async function getTotalValue(user) {
  const data = await Finance.find({ owner: user._id }, { balance: 1 })
    .sort({
      date: -1,
    })
    .limit(1);

  return data;
}

module.exports = {
  getAllTransactionData,
  getTotalValue,
};
