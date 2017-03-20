var fsu = require('../utils/fs-utils'),
    ru = require('../utils/runescape'),
    es = require('../utils/es-utils');

var runedate = process.argv[2];
var actualDate = ru.convertRuneDate(runedate);
var client = es.client.local();
var categories = {};
var items = {};
var prices = [];

fsu.readLineByLine('data/' + runedate + '/items.json', handleItem, handleError, handleDone);

function handleError(err) {
    console.log(JSON.stringify(err));
}

function handleDone() {
    var categoryKeys = Object.keys(categories);
    for (var i = 0; i < categoryKeys.length; i++) {
        fsu.appendToFile('data/' + runedate + '/db_categories.json', categories[categoryKeys[i]]);
        es.store(client, 'runescape-1', 'string', 1,'data/' + runedate + '/db_categories.json' , console.log('klaar'));
    }
        var itemKeys = Object.keys(items);
        for (var j = 0; j < itemKeys.length; j++) {
            fsu.appendToFile('data/' + runedate + '/db_items.json', items[itemKeys[j]]);
        }

        prices.forEach(function (price) {
            fsu.appendToFile('data/' + runedate + '/db_prices.json', price);
        })
    }

function handleItem(item) {
    var category = handleItemCategory(item);
    var detail = handleItemDetail(item, category);
  handleItemPricing(item, category, detail);
}

function handleItemCategory(item) {
    // -- get the category from the item
    var category = {
        id: item.type.toLowerCase(),
        name: item.type,
        icon: item.typeIcon
    };

    // -- add the category to the list of categories if needed
    if (! categories[category.id])
        categories[category.id] = category;

    // -- return the category
    return category;
}

function handleItemDetail(item, category) {
    // -- get the item detail from the item
    var detail = {
        id: item.id,
        icon: item.icon,
        category: category.id,
        name: item.name,
        description: item.description,
        forMembersOnly: item.members
    };

    // -- add the item to the list of items if needed
    if (! items[detail.id])
        items[detail.id] = detail;

    // -- return the item detail
    return detail;
}

function handleItemPricing(item, category, detail) {
    // -- create the pricing information
    var pricing = {
        category: category.id,
        item: detail.id,
        timestamp: actualDate,
        trend: item.current.trend,
        price: ru.convertPrice(item.current.price)
    };

    // -- add the price to the pricing information list
    prices.push(pricing);


}