const { Finance } = require('../../models');

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  // console.log(req.body);

  const newTransaction = await Finance.create({ ...req.body, owner: _id });

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
