const { Transaction } = require('../../models');

const recalcTransactions = async (operationType, type, date, sum, uid) => {
  if (type === 'income') {
    await Transaction.updateMany(
      {
        owner: uid,
        date: { $gt: date },
      },
      { $inc: { balance: operationType === 'add' ? sum : -sum } },
      { new: true },
    );
  } else {
    await Transaction.updateMany(
      {
        owner: uid,
        date: { $gt: date },
      },
      { $inc: { balance: operationType === 'add' ? -sum : sum } },
      { new: true },
    );
  }
};

const recalcBalance = async (type, uid, date, sum) => {
  let newBalance = 0;

  const LastBefore = await Transaction.find({
    owner: uid,
    date: { $lt: date },
  })
    .sort({
      date: -1,
    })
    .limit(1);

  const lastBalance = LastBefore[0]?.balance || 0;

  if (type === 'income') {
    lastBalance === 0 ? (newBalance = sum) : (newBalance = lastBalance + sum);
  } else {
    lastBalance === 0 ? (newBalance = -sum) : (newBalance = lastBalance - sum);
  }

  return newBalance;
};

const getStatistics = async (_id, year, month) => {
  const startDate = new Date(year, month - 1);
  const endDate = new Date(year, month);
  const statisticsByDate = await Transaction.find({
    owner: _id,
    $and: [{ date: { $gte: startDate } }, { date: { $lt: endDate } }],
  });
  const countStat = type => {
    return statisticsByDate
      .filter(i => i.type === type)
      .reduce((a, i) => a + i.sum, 0);
  };
  const uniqCategory = () => {
    const result = [];
    statisticsByDate.forEach(function (a) {
      if (!this[a.category]) {
        this[a.category] = {
          category: a.category,
          sum: 0,
        };
        result.push(this[a.category]);
      }
      this[a.category].sum += a.sum;
    }, Object.create(null));
    return result;
  };
  const incomeStatistics = countStat('income');
  const outlayStatistics = countStat('outlay');
  const statisticsByCategory = uniqCategory();
  return { incomeStatistics, outlayStatistics, statisticsByCategory };
};

const getAllTransactions = async (user, limit, page) => {
  const { docs, ...rest } = await Transaction.paginate(
    { owner: user._id },
    { sort: { date: -1 }, limit, page },
  );
  return { transactions: docs, ...rest };
};

const getBalance = async user => {
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

const addTransaction = async (uid, body) => {
  const { date, sum, type } = body;

  const newBalance = recalcBalance(type, uid, date, sum);

  // const LastBefore = await Transaction.find({
  //   owner: uid,
  //   date: { $lt: date },
  // })
  //   .sort({
  //     date: -1,
  //   })
  //   .limit(1);

  // const lastBalance = LastBefore[0]?.balance || 0;

  // if (type === 'income') {
  //   lastBalance === 0 ? (newBalance = sum) : (newBalance = lastBalance + sum);
  // } else {
  //   lastBalance === 0 ? (newBalance = -sum) : (newBalance = lastBalance - sum);
  // }

  // if (type === 'income') {
  //   await Transaction.updateMany(
  //     {
  //       owner: id,
  //       date: { $gt: date },
  //     },
  //     { $inc: { balance: sum } },
  //     { new: true },
  //   );

  //   lastBalance === 0 ? (newBalance = sum) : (newBalance = lastBalance + sum);
  //   // console.log('newBalance :>> ', newBalance);
  // } else {
  //   await Transaction.updateMany(
  //     {
  //       owner: id,
  //       date: { $gt: date },
  //     },
  //     { $inc: { balance: -sum } },
  //     { new: true },
  //   );

  //   lastBalance === 0 ? (newBalance = -sum) : (newBalance = lastBalance - sum);
  //   // console.log('newBalance :>> ', newBalance);
  // }
  recalcTransactions('add', type, date, sum, uid);

  const newTransaction = await Transaction.create({
    ...body,
    owner: uid,
    balance: newBalance,
  });
  return newTransaction;
};

const deleteTransaction = async (uid, ObjectID) => {
  const { date, sum, type } = await Transaction.findOne({
    owner: uid,
    _id: ObjectID,
  });
  // console.log({ ObjectID });

  // if (type === 'income') {
  //   await Transaction.updateMany(
  //     {
  //       owner: uid,
  //       date: { $gt: date },
  //     },
  //     { $inc: { balance: -sum } },
  //     { new: true },
  //   );
  // } else {
  //   await Transaction.updateMany(
  //     {
  //       owner: uid,
  //       date: { $gt: date },
  //     },
  //     { $inc: { balance: sum } },
  //     { new: true },
  //   );
  // }
  recalcTransactions('delete', type, date, sum, uid);

  const deleteTransaction = await Transaction.findOneAndDelete({
    owner: uid,
    _id: ObjectID,
  });
  return deleteTransaction;
};

const updateTransaction = async (uid, ObjectID, body) => {
  const { date, sum, type } = await Transaction.findOne({
    owner: uid,
    _id: ObjectID,
  });

  const newBalance = recalcBalance(type, uid, date, sum);
  // let newBalance = 0;

  // const LastBefore = await Transaction.find({
  //   owner: uid,
  //   date: { $lt: date },
  // })
  //   .sort({
  //     date: -1,
  //   })
  //   .limit(1);

  // const lastBalance = LastBefore[0]?.balance || 0;

  // if (type === 'income') {
  //   lastBalance === 0 ? (newBalance = sum) : (newBalance = lastBalance + sum);
  // } else {
  //   lastBalance === 0 ? (newBalance = -sum) : (newBalance = lastBalance - sum);
  // }

  // if (type === 'income') {
  //   await Transaction.updateMany(
  //     {
  //       owner: uid,
  //       date: { $gt: date },
  //     },
  //     { $inc: { balance: -sum } },
  //     { new: true },
  //   );
  // } else {
  //   await Transaction.updateMany(
  //     {
  //       owner: uid,
  //       date: { $gt: date },
  //     },
  //     { $inc: { balance: sum } },
  //     { new: true },
  //   );
  // }
  recalcTransactions('delete', type, date, sum, uid);
  recalcTransactions('add', body.type, body.date, body.sum, uid);

  const updateTransaction = await Transaction.findOneAndUpdate(
    { owner: uid, _id: ObjectID },
    { ...body, balance: newBalance },
    {
      new: true,
    },
  );
  return updateTransaction;
};

module.exports = {
  getStatistics,
  getAllTransactions,
  getBalance,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};
