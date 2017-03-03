var unirest = require('unirest');

var fs = require('fs');
var fsutils = require('./utils/fs-utils')
var categoryId = 8;
start(categoryId);
function start(categoryId) {
    unirest
        .get('http://services.runescape.com/m=itemdb_rs/api/catalogue/category.json?category=' + categoryId)
        .as.json(handleResponse);

    var requests = [];

    function handleResponse(response) {
        var body = JSON.parse(response.body);

        var alphabet = body.alpha;

        console.log(alphabet);

        alphabet.forEach(function (item) {
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
        if (requests.length == 0) restart(categoryId);
        else {
            var request = requests.pop();

            request();
        }
    }

    function fetchItemPageWrapper(category, letter, page) {
        requests.push(function () {
            fetchItemPage(category, letter, page)

        });
    }

    function fetchItemPage(category, letter, page) {
        console.log("fetch page " + page + " for letter " + letter);
        var url = "http://services.runescape.com/m=itemdb_rs/api/catalogue/items.json?category=" + category + "&alpha=" + letter + "&page=" + page;

        unirest
            .get(url)
            .as.json(function (response) {
            return handleItemResponse(response, page, letter, category);
        });

        setTimeout(getNext, 6000);
    }

    function handleItemResponse(response, page, letter, category) {

        for(i = 0; i < response.body.length; i++)
         {
             var test = JSON.parse(response.body);
             for(j = 0; j< test.items.length;j++) {
                 var test2 = JSON.stringify(test.items[j].current.price).replace("k", "00").replace("m", "00000");
                 Number(test2);
                 var id2 = JSON.stringify(test.items[j].id);
                 var Member = JSON.stringify(test.items[j].members);
                 var currenttrend  = JSON.stringify(test.items[j].current.trend);
                 var trendtoday = JSON.stringify(test.items[j].today.trend);
                 var pricetoday =  JSON.stringify(test.items[j].today.price);
                 var name =  JSON.stringify(test.items[j].name);

                 console.log(test2);
                 console.log(id2);
                 console.log(Member);
                 console.log(currenttrend);
                 console.log(trendtoday);
                 console.log(pricetoday);
                 console.log(name);
                 console.log("item number:"+(j+1));
              //   data = json.parse(test2 + id2 + Member + currenttrend + trendtoday + pricetoday + name);
                // fs.utils.writeData('data/test.JSON',data)
             }

              if (i = JSON.stringify(test.items.length)){
                i=response.body.length;
              }

             console.log(category)
        }
         var test3 = Number(test2);

//console.log(test2);
//console.log(test3);
         fs.writeFile( 'data/'+category+ '-' + letter + '-' + page +'-test.JSON',JSON.stringify(test.items));

}

//    }

}
//loop die niet het beste is
function restart(categoryId){
categoryId++;
if (categoryId < 33) {
start(categoryId);
    }
   else{
    return;
    }
}