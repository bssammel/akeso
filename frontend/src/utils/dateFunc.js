const msToYrs = function (msVal){
    const msDivisor = 365.25 * 24 * 60 *60 * 1000
    return msVal / (msDivisor)
}

const reformatISO = function (ISOString){

    const dateFormatString = ISOString.toDateString()
    let reformattedDateString = '';

    reformattedDateString = dateFormatString.slice(4,9) + "," + dateFormatString.slice(10, 14);

    return reformattedDateString;
}

module.exports = { msToYrs, reformatISO };
