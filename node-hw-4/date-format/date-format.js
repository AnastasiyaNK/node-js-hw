const moment = require('moment')

const now = moment()

console.log(
  `Current time:
  DD-MM-YYYY: ${now.format("DD-MM-YYYY")}
  MMM Do YY: ${now.format("MMM Do YY")}
  dddd: ${now.format("dddd")}`
);
