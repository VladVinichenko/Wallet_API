const {
  getAllTransactionData,
  getTotalValue,
} = require('../../repository/finance');

class FinanceService {
  async getAllTransaction(query, user) {
    const { limit = 10, page = 1 } = query;

    return await getAllTransactionData({ limit, page }, user);
  }

  async getTotal(user) {
    return await getTotalValue(user);
  }
}

module.exports = new FinanceService();
