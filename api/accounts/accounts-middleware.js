const accountsModel = require("./accounts-model");

exports.checkAccountPayload = async (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  try {
    let { budget, name } = req.body;
    if (budget === undefined || name === undefined) {
      res.status(400).json({ message: "name and budget are required" });
    } else {
      if (req.body.name) name = req.body.name.trim();
      if (name.length < 3 || name.length > 100) {
        res
          .status(400)
          .json({ message: "name of account must be between 3 and 100" });
      } else if (typeof budget !== "number") {
        res.status(400).json({ message: "budget of account must be a number" });
      } else if (budget < 0 || budget > 1000000) {
        res
          .status(400)
          .json({ message: "budget of account is too large or too small" });
      } else {
        //await accountsScheme.validate(req.body);
        req.body.name = name;
        next();
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let isExist = false;
    //BEGIN KÖTÜ ÇÖZÜM
    /* const accountExist = await accountsModel.getAll(); //kayıt sayısı çok olunca performans problemine yol açar.
    for (let i = 0; i < accountExist.length; i++) {
      const item = accountExist[i];
      if(item.name == req.body.name){
        isExist = true;
        break;
      }
    }*/
    //END KÖTÜ ÇÖZÜM

    //BEGIN İyi Çözüm
    const existAccount = await accountsModel.getByName(req.body.name);
    isExist = existAccount != null;
    //END İyi çözüm

    if (isExist) {
      res.status(400).json({ message: "that name is taken" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const existAccount = await accountsModel.getById(req.params.id);
    if (!existAccount) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.existAccount = existAccount;
      next();
    }
  } catch (error) {
    next(error);
  }
};
