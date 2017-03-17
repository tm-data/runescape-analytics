var fsu = require('../utils/fs-utils'),
    ru = require('../utils/runescape');

var runedate = process.argv[2];
var actualDate = ru.convertRuneDate(runedate);

var categories = [];
var prices = [];
var items = [];

fsu.readLineByLine('data/' + runedate + '/items.json', handleItem, handleError, handleDone);

function handleError(err) {
    console.log(JSON.stringify(err));
}

function handleDone() {
    categories.forEach(function(category) {
        fsu.appendToFile('data/' + runedate + '/db_categories.json', category);
    });

    items.forEach(function(detail) {
        fsu.appendToFile('data/' + runedate + '/db_items.json', detail);
    });

    prices.forEach(function(price) {
        fsu.appendToFile('data/' + runedate + '/db_prices.json', price);
    })
}

function handleItem(item) {
    var category = handleItemCategory(item);
    var detail = handleItemDetail(item, category);
    var pricing = handleItemPricing(item, category, detail);
}

function handleItemCategory(item) {
    // -- get the category from the item
    var category = {
        id: item.type.toLowerCase(),
        name: item.type,
        icon: item.typeIcon
    };

    // -- add the category to the list of categories if needed
    if (categories.indexOf(category) == -1)
        categories.push(category);

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
    if (items.indexOf(item) == -1)
        items.push(detail);

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

    // -- return the pricing information
    return pricing;
}