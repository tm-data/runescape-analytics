var fsu = require('../utils/fs-utils');
var ru = require ('../utils/runescape');

var runedate = process.argv[2];
console.log (runedate);

var categories=[];
var prices=[];
var items=[];

fsu.readLineByLine('data/' + runedate + '/items.json', handleItem, handleError, handleDone);


function handleError(err) {
    console.log(JSON.stringify(err));
}

function handleDone() {
    // console.log("Processing Complete");
    categories.forEach(function(item) {
        fsu.appendToFile('data/' + runedate + '/db_categories.json', item)
    });

//fsu.appendToFile(db_prices);
    prices.forEach(function(item) {
        fsu.appendToFile('data/' + runedate + '/db_prices.json', item)
    });

// fsu.appendToFile(db_items);
    items.forEach(function(item) {
        fsu.appendToFile('data/' + runedate + '/items.json', item)
    });
}

function handleItemCategory(item) {
    var category = {
        id:item.type.toLowerCase(),
        name:item.type,
        icon:item.typeIcon
    };

    if (categories.indexOf(category) == -1)
        categories.push(category);
};

function handleItemDetail(item) {
    var detail = {
        id:item.type.toLowerCase()
    };
    if (items.indexOf(detail)== -1)
        items.push(detail);
};


function handleItemPricing(item) {

}

function handleItem(item) {

// category


    //item - detail



    //pricing
    var pricing = {
        id: item.type.toLowerCase(),
        price: item.current.price
    };
    if (prices.indexOf(pricing) == -1)
        prices.push(pricing);

}
