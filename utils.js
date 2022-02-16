const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  const dataArrNums = strNums.map(function (str) {
    if(isNaN(parseInt(str))){
      throw new BadRequestError(`${str} is not a number.`);
    }
    return parseInt(str);
  });
  
  return dataArrNums;
}


module.exports = { convertStrNums };