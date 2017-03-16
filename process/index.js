var fsu = require('../utils/fs-utils');

var runedate = process.argv[2];

fsu.readLineByLine('data/' + runedate + '/items.json', handleItem, handleError, handleDone);

function handleError(err) {
    console.log(JSON.stringify(err));
}

function handleDone() {
    console.log("Processing Complete");
}

function handleItem(item) {

}