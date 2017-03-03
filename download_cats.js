var unirest = require('unirest'),
    fs = require('fs-extra'),
    fsu = require('./utils/fs-utils');

var Fetcher = require('./lib/fetcher');

unirest.get("https://secure.runescape.com/m=itemdb_rs/api/info.json")
    .end(function(response) {
        var payload = JSON.parse(response.body);
        var runedate = payload.lastConfigUpdateRuneday;

        // -- create the runedate data folder if it does not exist yet
        fs.mkdirs('data/' + runedate);

        var data = [];

        var categoryRequests = [];

        var categoryFetcher = new Fetcher(6000, function() {
            console.log("done");
        });

        var categories = fsu.readFile("data/categories.json", function(err, categories) {
            if (err) throw err;

            for (var i = 0; i < categories.length; i++) {
                categoryRequests.push({url: 'http://services.runescape.com/m=itemdb_rs/api/catalogue/category.json?category=' + categories[i].index, callback: function(id) {
                    return function(payload) {
                        fs.appendFileSync("data/" + runedate + "/_cats.json", JSON.stringify({id: id, alpha: payload.alpha}) + "\n");
                    };
                }(categories[i].index)});
            }

            categoryFetcher.run(categoryRequests);
        });
    });