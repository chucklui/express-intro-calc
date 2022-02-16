const { BadRequestError } = require("./expressError");
const fsP = require("fs/promises");

/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  const dataArrNums = strNums.map(function (str) {
    if (isNaN(parseInt(str))) {
      throw new BadRequestError(`${str} is not a number.`);
    }
    return parseInt(str);
  });

  return dataArrNums;
}


/** Takes an input of json and saves to file */
async function writeToFile(json) {
  try {
    await fsP.writeFile("./results.json", json, "utf8");
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = { convertStrNums, writeToFile };