var ElasticSearch = require('elasticsearch');

module.exports = {
    client: {
        local: localClient
    },
    store: store,
    storeparent: storeparent
};

function localClient() {
    return new ElasticSearch.Client({
        host: 'localhost:9200',
        log: 'debug'
    });
}

function store(client, indexName, type, id, data, callback) {
    return client.index({
        index: indexName,
        type: type,
        id: id,
        body: data
    }, callback);
}

function storeparent(client, indexName, type, id, data, vader, callback) {
    return client.index({
        index: indexName,
        type: type,
        id: id,
        body: data,
        parent: vader
    }, callback);
}