const { Transition } = require('../../models');

async function getAllTransactionData({ limit, page }, user) {
  const { docs: transition, ...rest } = await Transition.paginate(
    { owner: user._id },
    { sort: { date: -1 }, limit, page },
  );
  return { transition, ...rest };
}

async function getTotalValue(user) {
  const data = await Transition.find({ owner: user._id }, { balance: 1 })
    .sort({
      date: -1,
    })
    .limit(1);

  const allDates = await Transition.find({ owner: user._id }, { date: 1 });
  const years = allDates.reduce((acc, obj) => {
    const year = obj.date.getFullYear();
    if (!acc.includes(year)) acc.push(year);
    return acc;
  }, []);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return { user: data[0], aviableStatistics: { years, months } };
}

async function addTransaction(id, body) {
  const { date, sum, type } = body;
  // console.log('body.date :>> ', date);
  // console.log('owner id :>> ', id);
  // console.log('sum :>> ', sum);

  // const olderTrasactions = await Finance.find({
  //   owner: id,
  //   $and: [{ date: { $gt: date } }],
  // });
  // console.log('olderTrasactions :>> ', olderTrasactions);

  let newBalance = 0;

  const LastBefore = await Transition.find({
    owner: id,
    $and: [{ date: { $lt: date } }],
  })
    .sort({
      date: -1,
    })
    .limit(1);
  // console.log('LastBefore :>> ', LastBefore);
  // console.log('object', LastBefore.length);
  // console.log('Last not exist :>> ', Boolean(LastBefore.length === 0));
  // console.log('LastBefore.balance :>> ', LastBefore[0]?.balance);
  // console.log('type', type, sum);

  const lastBalance = LastBefore[0]?.balance || 0;

  if (type === 'income') {
    const updateManyResult = await Transition.updateMany(
      {
        owner: id,
        $and: [{ date: { $gt: date } }],
      },
      { $inc: { balance: sum } },
      { new: true },
    );
    // console.log('updateManyResult :>> ', updateManyResult);

    lastBalance === 0 ? (newBalance = sum) : (newBalance = lastBalance + sum);
    console.log('newBalance :>> ', newBalance);
  } else {
    const updateManyResult = await Transition.updateMany(
      {
        owner: id,
        $and: [{ date: { $gt: date } }],
      },
      { $inc: { balance: -sum } },
      { new: true },
    );
    // console.log('updateManyResult :>> ', updateManyResult);

    lastBalance === 0 ? (newBalance = -sum) : (newBalance = lastBalance - sum);
    console.log('newBalance :>> ', newBalance);
  }

  const newTransaction = await Transition.create({
    ...body,
    owner: id,
    balance: newBalance,
  });
  return newTransaction;
}

module.exports = {
  getAllTransactionData,
  getTotalValue,
  addTransaction,
};
