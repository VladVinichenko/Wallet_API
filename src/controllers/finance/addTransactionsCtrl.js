const { Transaction} = require('../../models')
const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors');

const addTransactionCtrl = async (req, res) => {
  const { _id } = req.user;
    const result = await Transaction.create({...req.body, owner:_id})
  
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}
module.exports = {

addTransactionCtrl  
}