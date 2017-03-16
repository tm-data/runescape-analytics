var fs = require('fs');
var LineByLineReader = require('line-by-line');

module.exports = {
    readLineByLine: readLineByLine,
    appendToFile: appendToFile,
    readContent: readJsonFile
};

/**
 * Read the given file, one line at a time.
 *
 * @param filename      the filename of the file to read
 * @param lineCallback  the function called on each line occurance
 * @param errorCallback the function called in case of an error
 * @param endCallback   the function called when all items have been processed
 */
function readLineByLine(filename, lineCallback, errorCallback, endCallback) {
    var lr = new LineByLineReader(filename);

    lr.on('error', errorCallback);

    lr.on('line', function (line) {
        if (line.length == 0) return;

        var item = JSON.parse(line);

        lineCallback(item);
    });

    lr.on('end', endCallback);
}

/**
 * Append the given object to the given file.
 *
 *  The file will be created if it does not already exists.
 *  The object will be converted to json as part of this method.
 *
 * @param filename  the filename of the file to which we want to append data
 * @param obj       the object to append to the file
 */
function appendToFile(filename, obj) {
    return fs.appendFileSync(filename, JSON.stringify(obj) + "\n");
}

/**
 * Read the contents of a json file
 *
 * @param filename  the json file to read
 * @param callback
 * @returns {*}
 */
function readJsonFile(filename, callback) {
    return fs.readContent(filename, 'utf8', function(err, content) {
        if (err) return callback(err);
        else return callback(null, JSON.parse(content));
    });
}