const { isValidDate, extractVowels,extractConsonants, normalizeString,computeControlCode, computeOmocodeList } = require("./lib/utils")
const {validateUserData, errorsText} = require('./lib/user.data.schema')
const {COMUNI} = require("./lib/comuni_prov")

/** 
 * Class representing a codice fiscale. Objects from this class are immutable: 
 * if you want to change some field, e.g. nome, after the object has been created, you can't do that.
 * 
 * */
class CodiceFiscale{
    
    get nome(){
        return this.__userData.nome;
    }

    get cognome(){
        return this.__userData.cognome;
    }

    get sesso(){
        return this.__userData.sesso;
    }

    get comune(){
        return this.__userData.comune;
    }

    get provincia(){
        return this.__userData.provincia;
    }

    get giorno(){
        return this.__userData.giorno;
    }

    get mese(){
        return this.__userData.mese;
    }

    get anno(){
        return this.__userData.anno;
    }
    /**
     * Create a codice fiscale object
     * @param {Object} fields - An object like this {nome: "Marco", cognome: "Rossi", sesso: "M", comune: "Milano", provincia: "MI", giorno: 1, mese: 1, anno: 1990}
     */
    constructor(userData){
        // Set data as instance properties
        const isValid = validateUserData(userData)
        if(!isValid)
            throw Error(errorsText(isValid.errors))
        

        // check whether data is a valid one
        const {giorno, mese, anno} = userData
        if(!isValidDate({giorno, mese, anno})){
            throw Error(`${JSON.stringify({ giorno, mese, anno })} is not a valid date`)
        }
        this.__userData = Object.freeze(userData)
        this.compute()
    }

    /**
     * Compute 3 letters code for cognome
     * @returns {string} the 3 letters code for cognome
     */
    getCodiceCognome(){
        return `${extractConsonants(this.cognome)}${extractVowels(this.cognome)}XXX`.substr(0, 3).toUpperCase()
    }

    // Syntactic sugar
    get codiceCognome(){ return this._cf? this._cf.substr(0,3) : this.getCodiceCognome() }


     /**
     * Compute 3 letters code for nome
     * @returns {string} the 3 letters code for nome
     */
    getCodiceNome(){
        let codNome = extractConsonants(this.nome)
        if (codNome.length >= 4) {
            codNome = codNome.charAt(0) + codNome.charAt(2) + codNome.charAt(3)
        } else {
            codNome += `${extractVowels(this.nome)}XXX`
            codNome = codNome.substr(0, 3)
        }
        return codNome.toUpperCase()
    }

    // Syntactic sugar
    get codiceNome(){ return this._cf? this._cf.substr(3,3) : this.getCodiceNome() }


     /**
     * Compute 2 number code for birthday year
     * @returns {string} the 2 number code for birthday year
     */
    getCodiceAnno(){
        const anno = `0${this.anno}`
        return anno.substr(anno.length - 2, 2)
    }

    // Syntactic sugar
    get codiceAnno(){ return this._cf ? this._cf.substr(6,2) :this.getCodiceAnno() }

    /**
     * Compute the letter associated with birhday month
     * @returns {string} the letter associated with birhday month
     */
    getCodiceMese(){
        const MONTH_TABLE = "ABCDEHLMPRST"
        return MONTH_TABLE[this.mese-1]
    }

    // Syntactic sugar
    get codiceMese(){ return this._cf? this._cf.charAt(8) : this.getCodiceMese() }

    /**
     * Compute the 2 letter code associated with birhday day and gender
     * @returns {string} the letter associated with birhday month
     */
    getCodiceGiorno(){
        let giorno = this.giorno
        if (this.sesso.toUpperCase() === 'F') {
            giorno += 40
        }
        giorno = `0${giorno}`
        return giorno.substr(giorno.length - 2, 2)
    }


    // Syntactic sugar
    get codiceGiorno(){ return this._cf? this._cf.substr(9,2) : this.getCodiceGiorno() }

    /**
     * Compute the 4 charcters code (1 letter, 3 numbers) associated with that Comune
     * @returns {string} the 4 charcters code (1 letter, 3 numbers) associated with that Comune. Raise an error when it can't find that comune
     */
    getCodiceComune(){
        try {
            return COMUNI[normalizeString(this.provincia)][normalizeString(this.comune)]['codice']
        } catch (error) {
            throw Error(`${this.comune} (${this.provincia}) not found`)
        }
    }

    // Syntactic sugar
    // TODO: questo e altri metodi, se richiamati più volte con gli stessi valori fanno di nuovo il calcolo (CACHING)
    get codiceComune(){ return this._cf? this._cf.substr(11,4) : this.getCodiceComune() }

    
    /**
     * Compute the 1 letter code from the first 15 CF characters 
     * @returns {string} the letter associated with birhday month
     */
    getCodiceControllo () {
        const partialCF = this.first15Chars()
        return computeControlCode(partialCF)
    }
    // Syntactic sugar  
    get codiceControllo(){
        return this._cf? this._cf.substr(15,2) : this.getCodiceControllo()
    }
    
    first15Chars(){
        return this.codiceCognome + this.codiceNome + this.codiceAnno + this.codiceMese + this.codiceGiorno + this.codiceComune
    }

    /**
     * An array containing all (7) possible omocodes
     * @returns {string[]} all possible omocodes
     */
    getOmocodeList() {
        return computeOmocodeList(this.first15Chars())
    }
    
    /**
     * Compute the codice fiscale
     */
    compute(){
        this._cf = this.first15Chars() + this.codiceControllo
    }

    /**
     * Return Codice fiscale as string 
     * @returns {string} Codice fiscale
     */
    toString(){
        return this._cf
    }

     /**
     * Return Codice fiscale as string 
     * @returns {string} Codice fiscale
     */
    get cf(){
        return this._cf
    }


    /**
     * Return Codice fiscale as JSON object like this 
     * {
     *      nome: 'Mario',
     *      cognome: 'Rossi',
     *      sesso: 'M',
     *      giorno: 1,
     *      mese: 1,
     *      anno: 1980,
     *      comune: 'Milano',
     *      provincia: 'MI',
     *      codice_fiscale: 'RSSMRA80A01F205X',
     *      omocodie: [
     *          'RSSMRA80A01F20RS',
     *          'RSSMRA80A01F2LRD',
     *          'RSSMRA80A01FNLRS',
     *          'RSSMRA80A0MFNLRK',
     *          'RSSMRA80ALMFNLRV',
     *          'RSSMRA8LALMFNLRG',
     *          'RSSMRAULALMFNLRD'
     *      ]
     * }
     * @returns {string} Codice fiscale
     */
    toJSON(){
        return {
            nome: this.nome,
            cognome: this.cognome,
            sesso: this.sesso,
            giorno: this.giorno,
            mese: this.mese,
            anno: this.anno,
            comune: this.comune,
            provincia: this.provincia,
            codice_fiscale: this.toString(),
            omocodie: this.getOmocodeList()
        }
    }
    
}


module.exports = CodiceFiscale