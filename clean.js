var fs = require('./utils/fs-utils');

// -- cleanup.js
// -- Clean the fetched data



// 1. read the data from the data/fetched folder.
fs.readData('data/fetched', function(err, filename, json) {
    json.forEach(function(item) {
        var transformedItem = transform(item);

        save(transformedItem);
    });
});

// 2. transform the data
function transform(item) {
    // do the transformation
    var price = item.current.price;
    if (typeof(price) == 'string') {
        if (price.lastIndexOf('k') == price.length - 1) {
            var amount = price.substring(0, price.length - 1);
            item.current.price = amount * 1000;
        } else if (price.lastIndexOf('K') == price.length - 1) {
            var amount = price.substring(0, price.length - 1);
            item.current.price = amount * 1000;
        } else if (price.lastIndexOf('m') == price.length - 1) {
            var amount = price.substring(0, price.length - 1);
            item.current.price = amount * 1000 * 1000;
        } else if (price.lastIndexOf('M') == price.length - 1) {
            var amount = price.substring(0, price.length - 1);
            item.current.price = amount * 1000 * 1000;
        }
    }

    price = item.today.price;
    if (typeof(price) == 'string') {
        if (price.lastIndexOf('k') == price.length - 1) {
            var amount = price.substring(0, price.length - 1);
            item.today.price = amount * 1000;
        } else if (price.lastIndexOf('K') == price.length - 1) {
            var amount = price.substring(0, price.length - 1);
            item.today.price = amount * 1000;
        } else if (price.lastIndexOf('m') == price.length - 1) {
            var amount = price.substring(0, price.length - 1);
            item.today.price = amount * 1000 * 1000;
        } else if (price.lastIndexOf('M') == price.length - 1) {
            var amount = price.substring(0, price.length - 1);
            item.today.price = amount * 1000 * 1000;
        }
    }

    delete item.icon;
    delete item.icon_large;
    delete item.typeIcon;

    return item;
}

// 3. write the data to the file
function save(item) {
    fs.appendFile('data/items.jsl', JSON.stringify(item) + "\n", function(err) {
        if (err) throw err;

        console.log('item written');
    });
}





