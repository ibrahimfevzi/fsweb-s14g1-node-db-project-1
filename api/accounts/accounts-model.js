const getAll = () => {
  // KODLAR BURAYA

  return db("accounts");
};

const getById = (id) => {
  // KODLAR BURAYA
  return db("accounts").where("id", id).first();
};

const create = (account) => {
  // KODLAR BURAYA
  return db("accounts").insert(account);
};

const updateById = (id, account) => {
  // KODLAR BURAYA
  return db("accounts").where("id", id).update(account);
};

const deleteById = (id) => {
  // KODLAR BURAYA
  return db("accounts").where("id", id).delete();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
