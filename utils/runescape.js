module.exports = {
    convertRuneDate: convertRuneDate,
    convertPrice: convertPrice
};

function convertRuneDate(runedate) {
    var daysSinceEpoch = runedate - runedate % 1;

    var d = new Date("2002-02-27");

    d.setDate(d.getDate() + daysSinceEpoch);

    console.log(d);

    return d;
}

function convertPrice(price) {
    if (typeof(price) == 'string') {
        // -- convert the string to lower case and remove all the ',' characters since they are used to split the
        // -- thousands
        price = price.toLowerCase();
        price = price.replace(/,/g, '');

        var multiplier = 1;
        if (price.indexOf('k') == price.length -1) multiplier = 1000;
        if (price.indexOf('m') == price.length -1) multiplier = 1000 * 1000;

        // -- check if a k is in the price
        if (multiplier == 1) {
            return parseFloat(price);
        } else {
            var amount = parseFloat(price.substring(0, price.length - 1));
            return parseFloat(amount) * multiplier;
        }
    } else {
        return price;
    }
}