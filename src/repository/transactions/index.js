const { Transaction } = require('../../models');

const getStatistics = async (_id, year, month, day) => {
  let startDate = null;
  let endDate = null;

  if (day !== undefined) {
    startDate = new Date(year, month - 1, day);
    endDate = new Date(year, month, day + 1);
  } else {
    startDate = new Date(year, month - 1);
    endDate = new Date(year, month);
  }

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
  // const months = allDates.reduce((acc, obj) => {
  //   const months = obj.date.getFullYear();
  //   if (!acc.includes(months)) acc.push(months);
  //   return acc;
  // }, []);
  // const day = allDates.reduce((acc, obj) => {
  //   const day = obj.date.getFullYear();
  //   if (!acc.includes(day)) acc.push(day);
  //   return acc;
  // }, []);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return { user: data[0], aviableStatistics: { years, months } };
};

const addTransaction = async (id, body) => {
  const { date, sum, type } = body;

  let newBalance = 0;

  const LastBefore = await Transaction.find({
    owner: id,
    $and: [{ date: { $lt: date } }],
  })
    .sort({
      date: -1,
    })
    .limit(1);

  const lastBalance = LastBefore[0]?.balance || 0;

  if (type === 'income') {
    await Transaction.updateMany(
      {
        owner: id,
        $and: [{ date: { $gt: date } }],
      },
      { $inc: { balance: sum } },
      { new: true },
    );

    lastBalance === 0 ? (newBalance = sum) : (newBalance = lastBalance + sum);
    console.log('newBalance :>> ', newBalance);
  } else {
    await Transaction.updateMany(
      {
        owner: id,
        $and: [{ date: { $gt: date } }],
      },
      { $inc: { balance: -sum } },
      { new: true },
    );

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
  getStatistics,
  getAllTransactions,
  getBalance,
  addTransaction,
};
