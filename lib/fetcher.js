var unirest = require('unirest');

function Fetcher(interval, doneFn) {
    if (interval) this.interval = interval;
    else this.interval = 0;

    this.ready = true;

    this.doneFn = doneFn || function() {};
}

Fetcher.prototype.run = function(requests) {
    if (requests.length === 0) return this.doneFn();
    if (!this.ready) return;

    var self = this;
    this.ready = false;

    var request = requests.shift();
    console.log("fetching " + request.url);

    unirest
        .get(request.url)
        .type("json")
        .end(function(response) {
            try {
                var obj = JSON.parse(response.body);

                request.callback(obj);
            } catch (err) {
                console.log(JSON.stringify(err));
                request.callback();
            }
        });

    setTimeout(function () {
        self.ready = true;
        self.run(requests);
    }, this.interval);
};

module.exports = Fetcher;