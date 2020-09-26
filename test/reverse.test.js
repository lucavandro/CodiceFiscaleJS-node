const ReversedCodiceFiscale = require('../src/reverse');

describe('ReversedCodiceFiscale ', ()=>{
    test('è definito', () => {
        expect(ReversedCodiceFiscale).toBeDefined()
    });

    test('è una classe', () => {
        expect(typeof ReversedCodiceFiscale).toBe('function')
    });


    describe('ha un costruttore', ()=>{
  
        test(`che accetta come unico parametro il codice fiscale sottoforma di stringa`,()=>{
            
            expect(new ReversedCodiceFiscale("RSSMRA80H23H501T").cf).toBe("RSSMRA80H23H501T")
        })

        test('se riceve un codice non valido lancia un eccezione', ()=>{
          
            expect(()=>new ReversedCodiceFiscale("R1SMRA80H23H501T")).toThrow()
            expect(()=>new ReversedCodiceFiscale("RSSMRA80H23H501T1")).toThrow()
            expect(()=>new ReversedCodiceFiscale("RSSMRA80H23H501")).toThrow()
            expect(()=>new ReversedCodiceFiscale("RSSMRA80H23H501R")).toThrow()
        })
    })

    test('converte correttamente i codici fiscali', ()=>{
        const reversed = new ReversedCodiceFiscale("RSSMRA80H23H501T")
        expect(reversed.toJSON()).toStrictEqual({
            nome: "MRA",
            cognome: "RSS",
            sesso: "M",
            comune: "ROMA",
            provincia: "RM",
            giorno: 23,
            mese:6,
            anno: 1980
        })  

    })

    test('converte correttamente i codici fiscali anche in caso di omocodia', ()=>{
        const reversed = new ReversedCodiceFiscale("SPSGPP75B18F83VM")
        expect(reversed.toJSON()).toStrictEqual({
            nome: "GPP",
            cognome: "SPS",
            sesso: "M",
            comune: "NAPOLI",
            provincia: "NA",
            giorno: 18,
            mese:2,
            anno: 1975
        })
    })

})