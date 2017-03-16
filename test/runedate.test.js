var runescapeUtils = require('../utils/runescape');

if (runescapeUtils.convertRuneDate(5493).getTime() != new Date(2017, 2, 16, 0, 0, 0).getTime()) console.log("LeapYears Failed!");
else console.log("LeapYears succes!");

if (runescapeUtils.convertRuneDate(5000).getTime() != new Date(2015, 10, 8, 0, 0, 0).getTime()) console.log("LeapYears Failed!");
else console.log("LeapYears succes!");
