var Q = require('q'),
    unirest = require('unirest');

module.exports = {
    runedate: getRunedate
};

function getRunedate() {
    var defer = Q.defer();

    try {
        unirest.get("https://secure.runescape.com/m=itemdb_rs/api/info.json")
            .type("json")
            .end(function (response) {
                if (! response.ok) defer.reject(response.body);
                else defer.resolve(JSON.parse(response.body).lastConfigUpdateRuneday);
            });
    } catch (err) {
        defer.reject(err);
    }

    return defer.promise;
}