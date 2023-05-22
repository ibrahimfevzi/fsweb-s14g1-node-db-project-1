const Account = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;

  if (!name || !budget) {
    return res.status(400).json({ message: "name and budget are required" });
  }

  const trimmedName = name.trim();
  if (trimmedName.length < 3 || trimmedName.length > 100) {
    return res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  }

  const parsedBudget = parseFloat(budget);
  if (isNaN(parsedBudget)) {
    return res
      .status(400)
      .json({ message: "budget of account must be a number" });
  }

  if (parsedBudget < 0 || parsedBudget > 1000000) {
    return res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  }

  req.body.name = trimmedName;
  req.body.budget = parsedBudget;

  next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existingAccount = await Account.getByName(req.body.name);
    if (existingAccount) {
      return res.status(400).json({ message: "that name is taken" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "error retrieving account from database" });
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: "account not found" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "error retrieving account from database" });
  }
};
