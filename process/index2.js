var fsu = require('../utils/fs-utils');
var ru = require('../utils/runescape');
var categories = [];
var prices = [];
var items = [];
var runedate = process.argv[2];

fsu.readLineByLine('data/' + runedate + '/items.json', handleItem, handleError, handleDone);

function handleError(err) {
    console.log(JSON.stringify(err));
}

function handleDone() {
    console.log("Processing Complete");
    fsu.appendToFile('data/categories6.json', categories);
    console.log('item written');

    fsu.appendToFile('data/pricing5.json', prices);

    console.log('item written');

    fsu.appendToFile('data/item5.json', items);

}

function handleItem(item) {
    handlecategory(item);
    handlepricing(item);
    handleitems(item);
}

function handlecategory(item) {
    var category ={
        categoryID : item.type.toLowerCase(),
        name: item.type,
        icon: item.typeIcon
    };
    if (categories.search(category.categoryID) == -1) {
        categories.push(category);
        console.log('test3');
    }

}


function handlepricing(item){
    console.log('test4');
    var pricing  = {
        price: item.current.price,
        categoryID: item.type.toLowerCase(),
        timestamp :  ru.convertRuneDate(runedate),
        trend: item.current.trend,
        itemID: item.id
    };
    var categoryID = item.type.toLowerCase();
    ru.convertPrice(pricing.price);
    prices.push(pricing);
}

function handleitems(item){
    items2 = {
        member: item.Member,
        name: item.name,
        Description: item.description,
        icon: item.icon,
        itemID: item.id,
        categoryID: item.type.toLowerCase()
    };
    console.log('test5');
    if (items.search(item.Name)==-1){
        items.push(items2);
        console.log('test6');
    }

}

