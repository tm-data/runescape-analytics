var fsu = require('../utils/fs-utils');
var ru = require ('../utils/runescape');

var runedate = process.argv[2];

var categories=[];
var prices=[];
var items=[];

fsu.readLineByLine('data/' + runedate + '/items.json', handleItem, handleError, handleDone);

//array.forEach(function(currentValue, index, arr), thisValue)


function handleError(err) {
    console.log(JSON.stringify(err));
}

function handleDone() {
    console.log("Processing Complete");
    categories.forEach(function(item) {
        fsu.appendToFile('data/' + runedate + '/db_categories.json', item)
    });

//fsu.appendToFile(db_prices);
// fsu.appendToFile(db_items);

}

function handleItem(item) {
//item - detail
    var detail = {
        id:item.type.toLowerCase()
    };
    if (items.indexOf(detail)== -1)
        items.push(detail);

// category
    var category = {
        id:item.type.toLowerCase(),
        name:item.type,
        icon:item.typeIcon
    };

    if (categories.indexOf(category) == -1)
        categories.push(category);

    //pricing
var pricing = {
    id: item.type.toLowerCase(),
    price: item.current.price
};
if (prices.indexOf(pricing) == -1)
    prices.push(price);

}
