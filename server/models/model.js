const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// categories => field => ['type', 'color']
const categorySchema = new Schema({
  type: {
    type: String,
    default: "Investment",
  },
  color: {
    type: String,
    default: "#FCBE44",
  },
});

// transactions => field => ['name', 'type', 'amount', 'date]
const transactionSchema = new Schema({
  name: {
    type: String,
    default: "Anonymous",
  },
  type: {
    type: String,
    default: "Investment",
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("Category", categorySchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Category, Transaction };
