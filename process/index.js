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
    fsu.appendFile('data/categories2.json', categories + "\n", function(err) {
        if (err) throw err;

        console.log('item written');
    });
    fsu.appendFile('data/pricing2.json', prices + "\n", function(err) {
        if (err) throw err;

        console.log('item written');
    });
    fsu.appendFile('data/item2.json', items+' \n', function(err) {
        if (err) throw err;

        console.log('item written');
    });
}

function handleItem(item) {
     handlecategory(item);
     handlepricing(item);
     handleitems(item);
}

function handlecategory(item) {
var category ={
     id : item.type.toLowerCase(),
    name: item.type,
    icon: item.typeIcon
};
    if (categories.indexOf(category.id) == -1) {
        categories.push(category);
        console.log('test3');
    }

}


function handlepricing(item){
    console.log('test4');
    var pricing  = {
        price: item.current.price,
        categoryID: item.type.toLowerCase()
    };
    var categoryID = item.type.toLowerCase();
    ru.convertPrice(pricing.price);
    prices.push(pricing.price);
    prices.push(categoryID);
}

function handleitems(item){
    items2 = {
        member: item.Member,
        name: item.name,
        Description: item.description,
        icon: item.icon
    };
    console.log('test5');
    if (items.indexOf(item.Name)==-1){
       items.push(items2);
        console.log('test6');
    }

}

