const router = require("express").Router();
const accountsModel = require("./accounts-model");
const mw = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const allAccounts = await accountsModel.getAll();
    res.json(allAccounts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkAccountId, (req, res, next) => {
  // KODLAR BURAYA
  try {
    res.json(req.existAccount);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      const insertedRecord = await accountsModel.create({
        name: req.body.name,
        budget: req.body.budget,
      });
      res.status(201).json(insertedRecord);
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
    // KODLAR BURAYA
    try {
      const updatedRecord = await accountsModel.updateById(req.params.id, {
        name: req.body.name,
        budget: req.body.budget,
      });
      res.json(updatedRecord);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await accountsModel.deleteById(req.params.id);
    res.json(req.existAccount);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 500).json({
    customMessage: "Global handler tarafında hata alındı",
    message: err.message,
  });
});

module.exports = router;
