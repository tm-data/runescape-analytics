var unirest = require('unirest'),
    fs = require('fs-extra'),
    fsu = require('./utils/fs-utils');

var Fetcher = require('./lib/fetcher');
//
var data = [];

var categoryRequests = [];

var categoryFetcher = new Fetcher(6000, function() {
    console.log("done");
});

fs.readFile('data/_cats.json', function() {

})

var categories = fsu.readFile("data/categories.json", function(err, categories) {
    if (err) throw err;

    for (var i = 0; i < categories.length; i++) {
        categoryRequests.push({url: 'http://services.runescape.com/m=itemdb_rs/api/catalogue/category.json?category=' + categories[i].index, callback: function(id) {
            return function(payload) {
                fs.appendFileSync("data/_cats.json", JSON.stringify({id: id, alpha: payload.alpha}) + "\n");
            };
        }(categories[i].index)});
    }

    categoryFetcher.run(categoryRequests);
});