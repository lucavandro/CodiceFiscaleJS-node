
const { validateUserData, errorsText} = require('../src/lib/user.data.schema')


describe("validateUserData", ()=>{
    test('è definito',()=>{
        expect(validateUserData).toBeDefined()
    })

    test('restituisce true se i dati sono validi',()=>{
        const isValid = validateUserData({
            nome: 'Marco',
            cognome: 'Rossi',
            sesso: 'M',
            comune: 'Milano',
            provincia: 'MI',
            giorno: 1,
            mese: 1,
            anno: 1980
            
        })
        expect(isValid).toBe(true)
        expect(validateUserData.errors).toBe(null)
    })

    test('restituisce false se i dati sono validi',()=>{
        const isValid = validateUserData({
            nome: 'Marco',
            cognome: 'Rossi',
            sesso: 'K',
            comune: 'Milano',
            provincia: 'MIA',
            giorno: -1,
            mese: 13,
            anno: 1980
            
        })
        expect(isValid).toBe(false)
        expect(validateUserData.errors).toBeDefined()
    })
})