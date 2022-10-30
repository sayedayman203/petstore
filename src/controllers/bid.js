const { matchedData } = require("express-validator");
const createError = require("http-errors");
const { responseFactory } = require("../helpers/responseFactory");

const { bidService } = require("../services");

exports.createBit = async (req, res, next) => {
  const bid = matchedData(req, { includeOptionals: true });

  try {
    await bidService.create(bid);
    res.status(201).json(
      responseFactory({
        code: 201,
        message: "created",
      })
    );
  } catch (err) {
    let { status, message } = err;
    next(createError(status || 400, message || ""));
  }
};

exports.getBids = async (req, res, next) => {
  const { petId } = req.query;
  try {
    const { bids } = await bidService.getBids(petId);
    return res.json(
      responseFactory({
        code: 200,
        data: bids,
      })
    );
  } catch (err) {
    let { status, message } = err;
    next(createError(status || 400, message || ""));
  }
};
