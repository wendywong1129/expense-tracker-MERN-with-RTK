const model = require("../models/model");

// POST: http://localhost:8080/api/categories
const createCategory = async (req, res) => {
  const Create = await new model.Category({
    type: "Investment",
    color: "#FCBE44",
  });
  await Create.save((err) => {
    if (!err) return res.status(201).json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating category ${err}` });
  });
};

// GET: http://localhost:8080/api/categories
const getCategories = async (req, res) => {
  let data = await model.Category.find({});

  let filter = await data.map((item) =>
    Object.assign({}, { type: item.type, color: item.color })
  );

  // return res.json(data);
  return res.json(filter);
};

// POST: http://localhost:8080/api/transactions
const createTransaction = async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "Request Body not Found" });

  const { name, type, amount } = req.body;
  const Create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });
  await Create.save((err) => {
    if (!err) return res.status(201).json(Create);
    return res
      .status(400)
      .json({ message: "Error while creating transaction" });
  });
};

// GET: http://localhost:8080/api/transactions
const getTransactions = async (req, res) => {
  let data = await model.Transaction.find({});
  return res.json(data);
};

// DELETE: http://localhost:8080/api/transactions
const deleteTransaction = async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "Request Body not Found" });
  await model.Transaction.deleteOne(req.body, (err) => {
    if (!err) res.json("Record Deleted!");
  })
    .clone()
    .catch((err) => res.json("Error while deleting transaction"));
};

// GET: http://localhost:8080/api/labels
const getLabels = async (req, res) => {
  model.Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((item) =>
        Object.assign(
          {},
          {
            _id: item._id,
            name: item.name,
            type: item.type,
            amount: item.amount,
            color: item.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((err) => res.status(400).json("Lookup Collection Error"));
};

module.exports = {
  createCategory,
  getCategories,
  createTransaction,
  getTransactions,
  deleteTransaction,
  getLabels,
};
