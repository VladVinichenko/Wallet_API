const { Transaction } = require('../../models');

const getAllTransactionData = async (user, limit, page) => {
  const { docs: transition, ...rest } = await Transaction.paginate(
    { owner: user._id },
    { sort: { date: -1 }, limit, page },
  );
  return { transition, ...rest };
};

const getTotalValue = async user => {
  const data = await Transaction.find({ owner: user._id }, { balance: 1 })
    .sort({
      date: -1,
    })
    .limit(1);

  const allDates = await Transaction.find({ owner: user._id }, { date: 1 });
  const years = allDates.reduce((acc, obj) => {
    const year = obj.date.getFullYear();
    if (!acc.includes(year)) acc.push(year);
    return acc;
  }, []);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return { user: data[0], aviableStatistics: { years, months } };
};

const addTransaction = async (id, body) => {
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

  const LastBefore = await Transaction.find({
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
    const updateManyResult = await Transaction.updateMany(
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
    const updateManyResult = await Transaction.updateMany(
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

  const newTransaction = await Transaction.create({
    ...body,
    owner: id,
    balance: newBalance,
  });
  return newTransaction;
};

module.exports = {
  getAllTransactionData,
  getTotalValue,
  addTransaction,
};
