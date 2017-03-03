var fs = require('./utils/fs-utils');
var LineByLineReader = require('line-by-line');
var elastic = require('elasticsearch')
// -- cleanup.js
// -- Clean the fetched data

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

// 1. read the data from the data/fetched folder.
    lr = new LineByLineReader('./data/items.json');
    lr.on('line', function (line) {
        var item = JSON.parse(line)
            var transformedItem = transform(item);
            save(transformedItem);
    });



// 2. transform the data
function transform(item) {
    // do the transformation
    var price = JSON.parse(item).current.price;
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



    delete item.icon;
    delete item.icon_large;
    delete item.typeIcon;

    return item;
}

// 3. write the data to the file
function save(item){
  //  fs.appendFile('data/itemstest.json', JSON.stringify(line) + "\n", function(err) {
   //     if (err) throw err;

client.update({
    index:'runescape-1'
        mappings:''
        console.log('item written');
});
}





