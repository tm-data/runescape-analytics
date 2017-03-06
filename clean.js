// -- cleanup.js
// -- Clean the fetched data
var fs = require('./utils/fs-utils');
var LineByLineReader = require('line-by-line');
var fs2 = require('fs')
var runedate = process.argv[2];

// 1. read the data from the data/fetched folder.
var lr = new LineByLineReader('data/items.json');

lr.on('error', function (err) {
    console.log(JSON.stringify(err));
});

lr.on('line', function (line) {
    var item = JSON.parse(line);

    var transformedItem = transform(item);

    save(transformedItem);
});

lr.on('end', function () {
    console.log("Ended");
});

// 2. transform the data
function transform(item) {
    // do the transformation
    item.current.price = transformPrice(item.current.price);

    return item;
}

function transformPrice(price) {
    var multipliers = {
        "m" : 1000 * 1000,
        "k" : 1000
    };

    if (typeof(price) == 'string') {
        var lastCharacter = price.substring(price.length - 1);

        var multiplier = multipliers[lastCharacter.toLowerCase()];
        var amount = 0;

        if (multiplier == null) {
            multiplier = 1;
            amount = price;
        } else {
            amount = price.substring(0, price.length - 1);
        }

        amount = amount.replace(",", "");

        return parseInt(amount) * multiplier;
    } else {
        return price;
    }
}

// 3. write the data to the file
function save(item) {
    fs2.appendFile('data/categories.json', JSON.stringify(item.name) +' '+ JSON.stringify(item.icon) + "\n", function(err) {
        if (err) throw err;

        console.log('item written');
    });
    fs2.appendFile('data/pricing.json', JSON.stringify(item.current.price) + "\n", function(err) {
        if (err) throw err;

        console.log('item written');
    });
    fs2.appendFile('data/item.json', JSON.stringify(item.name) +' '+JSON.stringify(item.description)  +' \n'+ JSON.stringify(item.icon) +' \n'+  JSON.stringify(item.icon_large) +' \n'+  JSON.stringify(item.members)+"\n", function(err) {
        if (err) throw err;

        console.log('item written');
    });

}




