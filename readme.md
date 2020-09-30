# CodiceFiscaleJS/Node

CodiceFiscaleJS/Node is a javascript and typescript utility library to compute and validate Italian  Italian Tax code (codice fiscale). Inspired to [CodiceFiscaleJS](https://github.com/lucavandro/CodiceFiscaleJS/), it was rewritten from scratch for Node.js, in order to be faster (actually it's, on average, twice faster than CodiceFiscaleJS 🚄) and hopefully easier to use.


## Don't fork, contribute!

Please, don't fork and republish this repository with silly minor changes! 😠 
Please, give your contribution instead: any help is more than welcome! 

## Installation
**Node**
```sh
npm install @codicefiscalejs-node --save
```

## Usage
```js
var {compute, reverse, validate} = require('@codicefiscalejs-node');

const cf = compute({
    nome: 'Marco',
    cognome: 'Rossi',
    sesso: 'M',
    comune: 'Milano',
    provincia: 'MI',
    giorno: 1,
    mese: 1,
    anno: 1980   
}) // RSSMRC80A01F205Z


const userData = reverse("RSSMRC80A01F205Z")
/
*{
    nome: 'Marco',
    cognome: 'Rossi',
    sesso: 'M',
    comune: 'Milano',
    provincia: 'MI',
    giorno: 1,
    mese: 1,
    anno: 1980   
}
*/

const valid = isValid("RSSMRC80A01F205Z") // true
const notValid = isValid("ABCDEF12G34H567I") //false
```

## TODO

* Docs
* Add Typescript types

