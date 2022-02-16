/** Simple demo Express app. */
const { findMean, findMode, findMedian } = require("./stats");
const express = require("express");
const app = express();

app.use(express.json());

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in querystring: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  // pull and convert incoming numbers into an array of numbers
  const data = req.query.nums;

  if (!data) {
    throw new BadRequestError("nums are required");
  }

  // convert data into an array of objects
  const dataArr = data.split(',');
  const dataArrNums = dataArr.map(function (str) {
    return parseInt(str);
  });

  const mean = findMean(dataArrNums);

  return res.json({ response: { operation: "mean", value: mean } });
})

/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;