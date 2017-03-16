module.exports = {
    convertRuneDate: convertRuneDate
};

function convertRuneDate(runedate) {
    var daysSinceEpoch = runedate - runedate % 1;

    var d = new Date("2002-02-27");

    d.setDate(d.getDate() + daysSinceEpoch);

    console.log(d);

    return d;
}
