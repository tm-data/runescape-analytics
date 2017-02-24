var unirest = require('unirest');
var fs = require('fs');

var categoryId = 0;
unirest
    .get('http://services.runescape.com/m=itemdb_rs/api/catalogue/category.json?category=' + categoryId)
    .as.json(handleResponse);

var requests = [];

function handleResponse(response) {
    var body = JSON.parse(response.body);

    var alphabet = body.alpha;

    console.log(alphabet);

    alphabet.forEach(function(item) {
        var number_of_records = item.items;
        var letter = item.letter;
        var number_of_pages = Math.ceil(number_of_records / 12);

        for (var pageIdx = 1; pageIdx <= number_of_pages; pageIdx++) {
            fetchItemPageWrapper(categoryId, letter, pageIdx);
        }
    });

    // -- start the processing of our requests
    getNext();
}


function getNext() {
    if (requests.length == 0) return;
    else {
        var request = requests.pop();

        request();
    }
}

function fetchItemPageWrapper(category, letter, page) {
    requests.push(function() {
        fetchItemPage(category, letter, page)
    });
}

function fetchItemPage(category, letter, page) {
    console.log("fetch page " + page + " for letter " + letter);
    var url = "http://services.runescape.com/m=itemdb_rs/api/catalogue/items.json?category=" + category + "&alpha=" + letter + "&page=" + page;

    unirest
        .get(url)
        .as.json(function(response){
            return handleItemResponse(response, category, letter, page)

        })

    setTimeout(getNext, 6000);
}

function handleItemResponse(response, category, letter, page) {
    console.log(response.body);

    //filename

    var filename = 'data/' + category + "-" + letter + "-" + page + "-" + "items.json";

    //data
        //naar json
    var bodyObj = JSON.parse(response.body);
        //enkel items
    var items = bodyObj.items;
        //string maken
    var data = JSON.stringify(items);

    fs.writeFile(filename, data, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

