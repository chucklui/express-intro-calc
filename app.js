/** Simple demo Express app. */
const { findMean, findMode, findMedian } = require("./stats");
const express = require("express");
const { convertStrNums, writeToFile } = require("./utils");
const app = express();

app.use(express.json());

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

/** Finds mean of nums in querystring: returns {operation: "mean", result } */
app.get("/mean", async function (req, res) {
  // pull and convert incoming numbers into an array of numbers
  const data = req.query.nums;
  if (!data) throw new BadRequestError(MISSING);

  // convert data into an array of objects
  const dataArr = data.split(',');
  const dataArrNums = convertStrNums(dataArr);
  const mean = findMean(dataArrNums);
  const json = { response: { operation: "mean", value: mean } };

  // console.log(req.query.save);
  // if (req.query.save) {
  //   writeToFile(dataArrNums);
  // }
  return res.json(json);

})


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  // pull and convert incoming numbers into an array of numbers
  const data = req.query.nums;

  if (!data) {
    throw new BadRequestError(MISSING);
  }

  // convert data into an array of objects
  const dataArr = data.split(',');
  const dataArrNums = convertStrNums(dataArr);
  const median = findMedian(dataArrNums);

  return res.json({ response: { operation: "median", value: median } });
})

/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function (req, res) {
  // pull and convert incoming numbers into an array of numbers
  const data = req.query.nums;

  if (!data) {
    throw new BadRequestError(MISSING);
  }

  // convert data into an array of objects
  const dataArr = data.split(',');
  const dataArrNums = convertStrNums(dataArr);
  const mode = findMode(dataArrNums);

  return res.json({ response: { operation: "mode", value: mode } });
})

/** Finds mean, median, and mode of nums in qs: returns 
 * {operation: "all", mean:mean, median:median, mode:mode } */
app.get("/all", function (req, res) {
  // pull and convert incoming numbers into an array of numbers
  const data = req.query.nums;

  if (!data) {
    throw new BadRequestError(MISSING);
  }

  // convert data into an array of objects
  const dataArr = data.split(',');
  const dataArrNums = convertStrNums(dataArr);
  const mode = findMode(dataArrNums);
  const median = findMedian(dataArrNums);
  const mean = findMean(dataArrNums);

  return res.json({ response: { operation: "all", mean, median, mode } });
})



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