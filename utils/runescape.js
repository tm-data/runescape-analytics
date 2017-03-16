module.exports = {
    convertRuneDate: convertRuneDate
};

var daysInMonth = { 0: 31, 1: 28, 2: 31, 3: 30, 4: 31, 5: 30, 6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31 };

function convertRuneDate(runedate) {
    var daysSinceEpoch = runedate - runedate % 1;

    var resultDate = new Date(2002, 2, 1, 0, 0, 0);
    var daysRemaining = daysSinceEpoch - 2;

    while (daysRemaining > 0) {
        var dim = daysInMonth[resultDate.getMonth()];
        if (daysRemaining <= dim - resultDate.getDate()) {
            resultDate.setDate(daysRemaining);
            daysRemaining = 0;
        } else {
            if (resultDate.getMonth() == 11) {
                resultDate.setFullYear(resultDate.getFullYear() + 1);
                resultDate.setMonth(0);
            } else {
                resultDate.setMonth(resultDate.getMonth() + 1);
            }

            daysRemaining = daysRemaining - dim;
        }
    }

    return resultDate;
}
