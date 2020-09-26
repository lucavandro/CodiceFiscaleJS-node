const {isValid, toNumberIfOmocodia} = require('./lib/utils')
const {MONTH_CODES} = require('./lib/constants')
const {CODE_TO_COMUNI} = require('./lib/code_to_comuni')
/** 
 * Class codice fiscale reversal. Objects from this class are immutable: 
 * if you want to change some field, e.g. nome, after the object has been created, you can't do that.
 * 
 * */

class ReversedCodiceFiscale{

    constructor(cf){
        if(isValid(cf)){
            this.cf = cf.toUpperCase()
        } else{
            throw Error(`${cf} is not a valid codice fiscale`)
        }

    }
    get nome(){
        return this.cf.substr(3,3)
    }
    get cognome(){
        return this.cf.substr(0,3)
    }
    
    get anno(){
        let yearCode = this.cf.substr(6, 2)
        yearCode = toNumberIfOmocodia(yearCode);
        const year19XX = parseInt(`19${yearCode}`, 10)
        const year20XX = parseInt(`20${yearCode}`, 10)
        const currentYear20XX = new Date().getFullYear()
        const year = year20XX > currentYear20XX ? year19XX : year20XX
        return year
    }

    get mese(){
        const monthChar = this.cf.substr(8, 1)
        return MONTH_CODES.indexOf(monthChar) + 1
    }

    get giorno(){
        let dayString = this.cf.substr(9, 2)
        dayString = toNumberIfOmocodia(dayString)
        let day = parseInt(dayString, 10)
        if (day > 31) {
            day = day - 40
        }
        return day
    }

    get sesso(){
        let dayString = this.cf.substr(9, 2)
        dayString = toNumberIfOmocodia(dayString)
        let day = parseInt(dayString, 10)
        return day > 31 ? 'F' : 'M'
    }

    get comune(){
        let cc = this.cf.substr(11, 4)
        let candiadates = CODE_TO_COMUNI[cc]
        return this.getComuneProv(cc)['nome']
    }

    get provincia(){
        let cc = this.cf.substr(11, 4)
        
        return this.getComuneProv(cc)['provincia']
    }

    getComuneProv(cc){
        const ccNums = toNumberIfOmocodia(cc.substr(1,3))
        const ccChar = cc.charAt(0)
        const comuneCC = ccChar + ccNums
        let candiadates = CODE_TO_COMUNI[comuneCC]
        if(candiadates.length == 1){
            return candiadates[0]
        }

        active_candidates = candiadates.filter((e)=> e.active)
        if(active_candidates.length > 0)
            return active_candidates[0]
        
        return candiadates[0]
    }

    toJSON(){
        return {
            nome: this.nome,
            cognome: this.cognome,
            sesso: this.sesso,
            giorno: this.giorno,
            mese: this.mese,
            anno: this.anno,
            comune: this.comune,
            provincia: this.provincia
        }
    }
}

module.exports = ReversedCodiceFiscale