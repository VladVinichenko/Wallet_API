const { Finance } = require('../../models');

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  const newTransaction = await Finance.create({
    ...req.body,
    owner: _id,
    balance: '2000.00',
  });

  res.status(201).json({
    status: 'OK',
    code: 201,
    message: 'Transaction created',
    data: newTransaction,
  });
};

module.exports = {
  addTransaction,
};
