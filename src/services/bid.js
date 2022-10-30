const { Bid } = require("../db/models/index");

const create = (bid) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Bid.create(bid);

      resolve();
    } catch (err) {
      err.status = 400;
      reject(err);
    }
  });
};

const getBids = (petId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //build conditions
      const query = {};
      if (petId) {
        query.petId = petId;
      }

      //get all
      const bids = await Bid.findAll({
        where: query,
      });
      resolve({ bids });
    } catch (err) {
      err.status = err.status || 404;
      reject(err);
    }
  });
};

module.exports = {
  create,
  getBids,
};
