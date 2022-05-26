const { User } = require('../../models');
const { Transaction } = require('../../models');

const deleteUser = async (uid, refreshToken) => {
  // console.log({ uid, refreshToken });
  const t01 = await User.findOne({ _id: uid, refreshToken });
  console.log(t01);
  // const t1 = await User.findOneAndDelete({ _id: uid, refreshToken });
  // console.log(t1);
  const t02 = await Transaction.find({ owner: uid });
  console.log(t02);
  // const t2 = await Transaction.deleteMany({ owner: uid });
  // console.log(t2);
};

module.exports = { deleteUser };
