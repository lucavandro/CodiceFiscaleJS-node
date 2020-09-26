const { ReversedCodiceFiscale, CodiceFiscale, compute, reverse, validate } = require('../src/index');

describe('CodiceFiscale/JS ', ()=>{
    test('ha una classe CodiceFiscale',()=>{
        expect(CodiceFiscale).toBeDefined()
    })

    test('ha una classe ReversedCodiceFiscale',()=>{
        expect(ReversedCodiceFiscale).toBeDefined()
    })

    test('ha una funzione chiamata compute',()=>{
        expect(compute).toBeDefined()
        expect(typeof compute).toBe('function')
    })

    test('ha una funzione chiamata reverse',()=>{
        expect(reverse).toBeDefined()
        expect(typeof reverse).toBe('function')
    })

    test('ha una funzione chiamata validate',()=>{
        expect(validate).toBeDefined()
        expect(typeof validate).toBe('function')
    })
})