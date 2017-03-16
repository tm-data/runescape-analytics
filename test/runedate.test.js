var runescapeUtils = require('../utils/runescape');

if (runescapeUtils.convertRuneDate(5496).getTime() != new Date("2017-03-16").getTime()) console.log("LeapYears Failed!");
else console.log("LeapYears succes!");

if (runescapeUtils.convertRuneDate(5000).getTime() != new Date("2015-11-06").getTime()) console.log("LeapYears Failed!");
else console.log("LeapYears succes!");
