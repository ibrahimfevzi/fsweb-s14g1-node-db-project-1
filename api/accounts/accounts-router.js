const router = require("express").Router();

const Account = require("./accounts-model");
const mw = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkAccountId, async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    res.json(account);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const account = await Account.create(req.body);
      res.status(201).json(account);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  mw.checkAccountId,
  mw.checkAccountPayload,
  async (req, res, next) => {
    try {
      const account = await Account.updateById(req.params.id, req.body);
      res.json(account);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  try {
    const account = await Account.deleteById(req.params.id);
    res.json(account);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

module.exports = router;
