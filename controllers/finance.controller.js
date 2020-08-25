const moment = require("moment");
const User = require("../models/user.model");
const Transaction = require("../models/transactions.model");
const Year = require("../models/year.model");
const ExpendTransaction = require("../models/expendTransaction.model");

module.exports.getEarning = async (req, res, next) => {
  const { name } = req.tokenPayload;
  const user = await User.findOne({ name });
  res.json({ earning: user.earning });
};
module.exports.postEarning = async (req, res, next) => {
  // test create new user and transaction
  const newTran = new Transaction(req.body);
  //find user and push transactions
  const { name } = req.tokenPayload;
  const user = await User.findOne({ name });

  user.earning.transactions.push(newTran);

  const tranDate = moment(newTran.date, "DD/MM/YYYY");

  // find index of year make transaction
  let index = user.earning.totalMoneyEachYear.findIndex(
    (item) => item.year === tranDate.year()
  );

  if (index < 0) {
    // create new year model
    const newYear = new Year({ year: tranDate.year() });
    user.earning.totalMoneyEachYear.push(newYear);
    index = user.earning.totalMoneyEachYear.length - 1;
  }
  // get month of transaction
  const month = tranDate.month();
  // add money in a month of months
  const year = user.earning.totalMoneyEachYear[index];
  year.months[month] += newTran.amount;

  // await user.save();
  await User.updateOne({ name }, { $set: { earning: user.earning } });
  return res.status(202).json({ msg: "Submit Complete" });
};
module.exports.getSpending = async (req, res, next) => {
  const { name } = req.tokenPayload;
  const user = await User.findOne({ name });
  const { transactions } = user.spending;
  transactions.sort(function (firstTransaction, secondTransaction) {
    const firstMonth = moment(firstTransaction.date, "DD/MM/YYYY").dayOfYear();
    const secondMonth = moment(
      secondTransaction.date,
      "DD/MM/YYYY"
    ).dayOfYear();
    return firstMonth - secondMonth;
  });

  res.json({ spending: user.spending });
};
module.exports.postSpending = async (req, res, next) => {
  // test create new user and transaction
  const newTran = new ExpendTransaction(req.body);
  //find user and push transactions
  const { name } = req.tokenPayload;
  const user = await User.findOne({ name });
  user.spending.transactions.push(newTran);

  const tranDate = moment(newTran.date, "DD/MM/YYYY");

  // find index of year make transaction
  let index = user.spending.totalMoneyEachYear.findIndex(
    (item) => item.year === tranDate.year()
  );

  if (index < 0) {
    // create new year model
    const newYear = new Year({ year: tranDate.year() });
    user.spending.totalMoneyEachYear.push(newYear);
    index = user.spending.totalMoneyEachYear.length - 1;
  }
  // get month of transaction
  const month = tranDate.month();
  // add money in a month of months
  const year = user.spending.totalMoneyEachYear[index];
  year.months[month] += newTran.amount;

  // await user.save();
  await User.updateOne({ name }, { $set: { spending: user.spending } });
  return res.status(202).json({ msg: "Submit Complete" });
};
