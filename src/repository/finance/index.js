const { Finance } = require('../../models');

async function getAllTransactionData({ limit, page }, user) {
  const { docs: transition, ...rest } = await Finance.paginate(
    { owner: user._id },
    { sort: { date: -1 }, limit, page },
  );
  return { transition, ...rest };
}
async function getTotalValue(user) {
  // console.log('user', user);
  const data = await Finance.find({ owner: user._id }, { balance: 1 })
    .sort({
      date: -1,
    })
    .limit(1);

  // console.log('data', { user: data[0] });
  return { user: data[0] };
}

module.exports = {
  getAllTransactionData,
  getTotalValue,
};
