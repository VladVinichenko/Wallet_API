const { Transaction} = require('../../models')
const { Conflict, Unauthorized, NotFound, BadRequest } = require('http-errors');

const getTransactionsCtrl = async (req, res) => { 
    const { _id } = req.user;

    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
 
  const result = await Transaction.find({ owner: _id }/* , "", { skip, limit: Number(limit) } */)
  
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

module.exports = {

getTransactionsCtrl  
}