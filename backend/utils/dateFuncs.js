const ageCalc = function (ptDOB){
    //limited to not use libraries like Day.js, need to come up with better solution in the long term

    // console.log("age stuff")
    let ageInMS = Date.now() - ptDOB.getTime()
    // console.log(ageInMS)
    let ageInYrs = Math.floor(msToYrs(ageInMS))
    // console.log('ageInYrs: ', ageInYrs)
    return ageInYrs
}


const msToYrs = function (msVal){
    const msDivisor = 365.25 * 24 * 60 *60 * 1000
    return msVal / (msDivisor)
}

module.exports = { ageCalc };
