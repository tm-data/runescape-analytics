var unirest = require('unirest');

function Fetcher(interval) {
    if (interval) this.interval = interval;
    else this.interval = 0;

    this.schedule = [];
    this.executing = false;
}

Fetcher.prototype.push = function(url, cb) {
    var me = this;

    this.schedule.push(function() {
        unirest
            .get(url)
            .as.json(function(response) {
                var data = JSON.parse(response.body);

                // -- return the response
                cb(data);

                // -- wait for the next step to execute
                setTimeout(me._next, me.interval);
            });
    });
};

Fetcher.prototype.execute = function() {
    if (this.executing) {
        console.log("The executable queue is already being executed.");
        return;
    }

    this.executing = true;

    this._next();
};

Fetcher.prototype._next = function() {
    if (this.schedule.length > 0) {
        var fn = this.schedule.pop();

        fn();
    }
};

module.exports = Fetcher;