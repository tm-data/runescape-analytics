var fs = require('fs');
var LineByLineReader = require('line-by-line');

module.exports = {
    readLineByLine: readLineByLine,
    readFile: readJsonFile,
    readData: readData,
    writeData: writeData
};

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

function readJsonFile(filename, callback) {
    return fs.readFile(filename, 'utf8', function(err, content) {
        if (err) return callback(err);
        else return callback(null, JSON.parse(content));
    });
}

/**
 * Read the data from a directory.
 *
 * The data read from the file will be parsed into an object before
 * being passed to the callback.
 *
 * @param directory string                      the directory to read the data from
 * @param callback  fn(err,filename,json)       the function called for each file read in the directory
 *                                              err is the error in case one occured
 *                                              filename is the filename of the file which was read
 *                                              json is the json data stored in the file
 */
function readData(directory, callback) {
    fs.readdir(directory, function(files) {
        if (files == null) return;

        files.forEach(function(file) {
            fs.readFile(directory + '/' + file, 'utf8', function(err, data) {
                if (err) return callback(err);

                try {
                    callback(null, file, JSON.parse(data));
                } catch (err) {
                    callback(err);
                }
            });
        });
    });
}

/**
 * write data to a file.
 *
 * The data will be converted to a string before being written to the file.
 *
 * @param file      string      the file to write data to
 * @param data      object      the data to write to the file
 * @param callback  fn(err)     the function called when data is written to disk.
 */
function writeData(file, data, callback) {
    return fs.writeFile(file, JSON.stringify(data), callback);
}