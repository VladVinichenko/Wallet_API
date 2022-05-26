const { User } = require('../../models');
const { Transaction } = require('../../models');

const deleteUser = async uid => {
  const t1 = await User.findByIdAndDelete(uid);
  console.log(t1);
  const t2 = await Transaction.deleteMany({ owner: uid });
  console.log(t2);
};

module.exports = { deleteUser };
