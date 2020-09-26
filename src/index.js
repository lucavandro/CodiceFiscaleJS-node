const CodiceFiscale = require('./cf')
const ReversedCodiceFiscale = require('./reverse')
const {isValid} = require('./lib/utils')


const compute = (userData) =>{
    return new CodiceFiscale(userData).cf
}

const reverse = (cf) =>{
    return new ReversedCodiceFiscale(cf).toJSON()
}



module.exports = {
    CodiceFiscale,
    ReversedCodiceFiscale,
    compute,
    reverse,
    validate: isValid
}