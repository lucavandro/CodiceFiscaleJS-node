const Ajv = require('ajv');
const userSchema = {   
    "type": "object",
    "required": [
        "nome", 
        "cognome", 
        "comune", 
        "provincia", 
        "sesso", 
        "giorno", 
        "mese", 
        "anno"
    ],
    "properties": {
        "nome": {
            "type": "string"
        },
        "cognome": {
            "type": "string"
        },
        "comune": {
            "type": "string"
        },
        "provincia": {
            "type": "string"
        },
        "sesso": {
            "type": "string",
            "minLength": 1,
            "maxLength": 1,
            "pattern": "[MFmf]"
        },
        "giorno": {
            "type": "number",
            "minimum": 1,
            "maximum": 31
        },
        "mese": {
            "type": "number",
            "minimum": 1,
            "maximum": 12
        },
        "anno": {
            "anyOf": [
                { "type": "string" },
                { "type": "number" }
              ]
        }
    }
}

const ajv = new Ajv({allErrors: true});
const validateUserData = ajv.compile(userSchema);

const errorsText = (errors)=>{
    return ajv.errorsText(errors).replace("data.",'')
}
module.exports = {
    validateUserData,
    errorsText
}