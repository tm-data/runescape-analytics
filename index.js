var unirest = require('unirest');
var Fetcher = require('./lib/fetcher');

var fetcher = new Fetcher(6000);

var categoryId = 0;
unirest
    .get('http://services.runescape.com/m=itemdb_rs/api/catalogue/category.json?category=' + categoryId)
    .as.json(handleResponse);

function handleResponse(response) {
    var body = JSON.parse(response.body);

    var alphabet = body.alpha;

    alphabet.forEach(function(item) {
        var number_of_records = item.items;
        var letter = item.letter;
        var number_of_pages = Math.ceil(number_of_records / 12);

        for (var pageIdx = 1; pageIdx <= number_of_pages; pageIdx++) {
            fetcher.push("http://services.runescape.com/m=itemdb_rs/api/catalogue/items.json?category=" + categoryId + "&alpha=" + letter + "&page=" + pageIdx, handleItemResponse);
        }
    });

    // -- start the processing of our requests
    fetcher.execute();
}

function handleItemResponse(response, page, letter, category) {
    console.log("body: " + JSON.stringify(response));

    fs.writeFile(category + "-" + letter + "-" + page + "-items.json", JSON.stringify(response), function(err) {
        if (err) console.log(JSON.stringify(err));

        console.out("We did it!");
    });
}