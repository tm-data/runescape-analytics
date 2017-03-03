var unirest = require('unirest'),
    fs = require('fs-extra'),
    LineByLineReader = require('line-by-line');

var Fetcher = require('./lib/fetcher');

var data = [];

var itemRequests = [];
var itemFetcher = new Fetcher(6000, function() {});

unirest.get("https://secure.runescape.com/m=itemdb_rs/api/info.json")
    .end(function(response) {
        var payload = JSON.parse(response.body);
        var runedate = payload.lastConfigUpdateRuneday;

        var lr = new LineByLineReader('data/' + runedate + '/_cats.json');

        lr.on('error', function (err) {
            console.log(JSON.stringify(err));
        });

        lr.on('line', function (line) {
            if (line.length == 0) return;

            var cat = JSON.parse(line);

            cat.alpha.forEach(function(item) {
                var number_of_records = item.items;
                var letter = item.letter;
                var number_of_pages = Math.ceil(number_of_records / 12);

                for (var pageIdx = 1; pageIdx <= number_of_pages; pageIdx++) {
                    itemRequests.push({url: "http://services.runescape.com/m=itemdb_rs/api/catalogue/items.json?category=" + cat.id + "&alpha=" + encodeURIComponent(letter) + "&page=" + pageIdx, callback: function (letter, pageIdx) {
                        return function (payload) {
                            if (!payload || !payload.items) return;

                            payload.items.forEach(function(item) {
                                fs.appendFileSync('data/' + runedate + '/items.json', JSON.stringify(item) + '\n');
                            });
                        };
                    }(letter, pageIdx)});
                }
            });
        });

        lr.on('end', function () {
            itemFetcher.run(itemRequests);
        });
    });