const CodiceFiscale = require('../src/cf');

describe('CodiceFiscale ', ()=>{
    // Dati riccorrenti nei test
    const mockUserData = {
        nome: 'Marco',
        cognome: 'Rossi',
        sesso: 'M',
        comune: 'Milano',
        provincia: 'MI',
        giorno: 1,
        mese: 1,
        anno: 1980
        
    }
    const cf = new CodiceFiscale(mockUserData); // RSSMRC80A01F205Z
    
    test('è definito', () => {
        expect(CodiceFiscale).toBeDefined()
    });

    test('è una classe', () => {
        expect(typeof CodiceFiscale).toBe('function')
    });

    describe('ha un costruttore', ()=>{
  
        test(`accetta dati in questo formato ${JSON.stringify(mockUserData)}`,()=>{
            
            expect(cf.nome).toBe(mockUserData.nome)
            expect(cf.cognome).toBe(mockUserData.cognome)
            expect(cf.sesso).toBe(mockUserData.sesso)
            expect(cf.comune).toBe(mockUserData.comune)
            expect(cf.provincia).toBe(mockUserData.provincia)
            expect(cf.giorno).toBe(mockUserData.giorno)
            expect(cf.mese).toBe(mockUserData.mese)
            expect(cf.anno).toBe(mockUserData.anno)
        })

        test('rileva errori nelle date', ()=>{
            const wrongDateUserDate1 = { ...mockUserData,
                giorno: 1,
                mese: 13,
                anno: 1980                
            }
            expect(()=>new CodiceFiscale(wrongDateUserDate1)).toThrow()
        })

        test('lancia un errore quando uno dei campi richiesti è mancante', ()=>{
            const fieldList = Object.keys(mockUserData)
            fieldList.forEach(field=>{
                let tmpMissingUserData = {...mockUserData}
                delete tmpMissingUserData[field]
                expect(()=>new CodiceFiscale(tmpMissingUserData)).toThrow()
            })
        })

        
    })

    test('calcola il codice del cognome', ()=>{
        expect(cf.codiceCognome).toBe('RSS')
    })

    test('calcola il codice del cognome anche quando non ci sono sufficienti consonanti', ()=>{
        let cf = new CodiceFiscale({...mockUserData, cognome: 'Cicia'})
        expect(cf.codiceCognome).toBe('CCI')
    })
    
    test('calcola il codice del cognome anche di Patrick Swayze' , ()=>{
        let cf = new CodiceFiscale({...mockUserData, cognome: 'Swayze'})
        expect(cf.codiceCognome).toBe('SWY')
    })

    test('calcola il codice del nome', ()=>{
        expect(cf.codiceNome).toBe('MRC')
        // Proviamo con un po' di nomi differenti 😉
        expect(new CodiceFiscale({...mockUserData, nome: 'Camillo'}).codiceNome).toBe('CLL')
        expect(new CodiceFiscale({...mockUserData, nome: 'Annalisa'}).codiceNome).toBe('NLS')
        expect(new CodiceFiscale({...mockUserData, nome: 'Valentina'}).codiceNome).toBe('VNT')
        expect(new CodiceFiscale({...mockUserData, nome: 'Caterina'}).codiceNome).toBe('CRN')
      
    })

    test('calcola il codice del nome anche quando non ci sono sufficienti consonanti', ()=>{
   
        expect(new CodiceFiscale({...mockUserData, nome: 'Luca'}).codiceNome).toBe('LCU')
        expect(new CodiceFiscale({...mockUserData, nome: 'Anna'}).codiceNome).toBe('NNA')
    })

    test('calcola il codice del nome anche per quei disgraziati che hanno due o più nomi', ()=>{
        expect(new CodiceFiscale({...mockUserData, nome: 'Luca Adalberto'}).codiceNome).toBe('LDL')
        expect(new CodiceFiscale({...mockUserData, nome: 'Angela Rita'}).codiceNome).toBe('NLR')
    })

    test('calcola il codice del nome anche di Patrick Swayze' , ()=>{
        let cf = new CodiceFiscale({...mockUserData, nome: 'Patrick'})
        expect(cf.codiceNome).toBe('PRC')
    })

    test("calcola il codice dell'anno quando questo viene fornito con 4 cifre", ()=>{
        expect(new CodiceFiscale({...mockUserData, anno: 1987 }).codiceAnno).toBe('87')
        expect(new CodiceFiscale({...mockUserData, anno: 1991 }).codiceAnno).toBe('91')
        expect(new CodiceFiscale({...mockUserData, anno: 2021 }).codiceAnno).toBe('21')
        expect(new CodiceFiscale({...mockUserData, anno: 1866 }).codiceAnno).toBe('66')
        expect(new CodiceFiscale({...mockUserData, anno: 2000 }).codiceAnno).toBe('00')
    })
    
    
    test("calcola il codice dell'anno quando questo viene fornito con 2 cifre", ()=>{
        expect(new CodiceFiscale({...mockUserData, anno: 87 }).codiceAnno).toBe('87')
        expect(new CodiceFiscale({...mockUserData, anno: 91 }).codiceAnno).toBe('91')
        expect(new CodiceFiscale({...mockUserData, anno: 21 }).codiceAnno).toBe('21')
        expect(new CodiceFiscale({...mockUserData, anno: 66 }).codiceAnno).toBe('66')
        expect(new CodiceFiscale({...mockUserData, anno: "00" }).codiceAnno).toBe('00')
    })

    test("calcola il codice del mese", ()=>{
        expect(new CodiceFiscale({...mockUserData, mese: 1 }).codiceMese).toBe('A')
        expect(new CodiceFiscale({...mockUserData, mese: 2 }).codiceMese).toBe('B')
        expect(new CodiceFiscale({...mockUserData, mese: 3 }).codiceMese).toBe('C')
        expect(new CodiceFiscale({...mockUserData, mese: 4 }).codiceMese).toBe('D')
        expect(new CodiceFiscale({...mockUserData, mese: 5 }).codiceMese).toBe('E')
        expect(new CodiceFiscale({...mockUserData, mese: 6 }).codiceMese).toBe('H')
        expect(new CodiceFiscale({...mockUserData, mese: 7 }).codiceMese).toBe('L')
        expect(new CodiceFiscale({...mockUserData, mese: 8 }).codiceMese).toBe('M')
        expect(new CodiceFiscale({...mockUserData, mese: 9 }).codiceMese).toBe('P')
        expect(new CodiceFiscale({...mockUserData, mese: 10}).codiceMese).toBe('R')
        expect(new CodiceFiscale({...mockUserData, mese: 11}).codiceMese).toBe('S')
        expect(new CodiceFiscale({...mockUserData, mese: 12}).codiceMese).toBe('T')
    })

    test("calcola il codice del giorno", ()=>{
        expect(new CodiceFiscale({...mockUserData, giorno: 1 }).codiceGiorno).toBe('01')
        expect(new CodiceFiscale({...mockUserData, giorno: 2 }).codiceGiorno).toBe('02')
        expect(new CodiceFiscale({...mockUserData, giorno: 3 }).codiceGiorno).toBe('03')
        expect(new CodiceFiscale({...mockUserData, giorno: 4 }).codiceGiorno).toBe('04')
        expect(new CodiceFiscale({...mockUserData, giorno: 5 }).codiceGiorno).toBe('05')
        expect(new CodiceFiscale({...mockUserData, giorno: 6 }).codiceGiorno).toBe('06')
        expect(new CodiceFiscale({...mockUserData, giorno: 7 }).codiceGiorno).toBe('07')
        expect(new CodiceFiscale({...mockUserData, giorno: 8 }).codiceGiorno).toBe('08')
        expect(new CodiceFiscale({...mockUserData, giorno: 9 }).codiceGiorno).toBe('09')
        expect(new CodiceFiscale({...mockUserData, giorno: 10 }).codiceGiorno).toBe('10')
        expect(new CodiceFiscale({...mockUserData, giorno: 11 }).codiceGiorno).toBe('11')
        expect(new CodiceFiscale({...mockUserData, giorno: 12 }).codiceGiorno).toBe('12')
        expect(new CodiceFiscale({...mockUserData, giorno: 13 }).codiceGiorno).toBe('13')
        expect(new CodiceFiscale({...mockUserData, giorno: 14 }).codiceGiorno).toBe('14')
        expect(new CodiceFiscale({...mockUserData, giorno: 15 }).codiceGiorno).toBe('15')
        expect(new CodiceFiscale({...mockUserData, giorno: 16 }).codiceGiorno).toBe('16')
        expect(new CodiceFiscale({...mockUserData, giorno: 17 }).codiceGiorno).toBe('17')
        expect(new CodiceFiscale({...mockUserData, giorno: 18 }).codiceGiorno).toBe('18')
        expect(new CodiceFiscale({...mockUserData, giorno: 19 }).codiceGiorno).toBe('19')
        expect(new CodiceFiscale({...mockUserData, giorno: 20 }).codiceGiorno).toBe('20')
        expect(new CodiceFiscale({...mockUserData, giorno: 21 }).codiceGiorno).toBe('21')
        expect(new CodiceFiscale({...mockUserData, giorno: 22 }).codiceGiorno).toBe('22')
        expect(new CodiceFiscale({...mockUserData, giorno: 23 }).codiceGiorno).toBe('23')
        expect(new CodiceFiscale({...mockUserData, giorno: 24 }).codiceGiorno).toBe('24')
        expect(new CodiceFiscale({...mockUserData, giorno: 25 }).codiceGiorno).toBe('25')
        expect(new CodiceFiscale({...mockUserData, giorno: 26 }).codiceGiorno).toBe('26')
        expect(new CodiceFiscale({...mockUserData, giorno: 27 }).codiceGiorno).toBe('27')
        expect(new CodiceFiscale({...mockUserData, giorno: 28 }).codiceGiorno).toBe('28')
        expect(new CodiceFiscale({...mockUserData, giorno: 29 }).codiceGiorno).toBe('29')
        expect(new CodiceFiscale({...mockUserData, giorno: 30 }).codiceGiorno).toBe('30')
        expect(new CodiceFiscale({...mockUserData, giorno: 31 }).codiceGiorno).toBe('31')

        // E ora tocca al gentil sesso 👧
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 1 }).codiceGiorno).toBe('41')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 2 }).codiceGiorno).toBe('42')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 3 }).codiceGiorno).toBe('43')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 4 }).codiceGiorno).toBe('44')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 5 }).codiceGiorno).toBe('45')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 6 }).codiceGiorno).toBe('46')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 7 }).codiceGiorno).toBe('47')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 8 }).codiceGiorno).toBe('48')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 9 }).codiceGiorno).toBe('49')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 10 }).codiceGiorno).toBe('50')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 11 }).codiceGiorno).toBe('51')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 12 }).codiceGiorno).toBe('52')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 13 }).codiceGiorno).toBe('53')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 14 }).codiceGiorno).toBe('54')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 15 }).codiceGiorno).toBe('55')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 16 }).codiceGiorno).toBe('56')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 17 }).codiceGiorno).toBe('57')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 18 }).codiceGiorno).toBe('58')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 19 }).codiceGiorno).toBe('59')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 20 }).codiceGiorno).toBe('60')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 21 }).codiceGiorno).toBe('61')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 22 }).codiceGiorno).toBe('62')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 23 }).codiceGiorno).toBe('63')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 24 }).codiceGiorno).toBe('64')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 25 }).codiceGiorno).toBe('65')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 26 }).codiceGiorno).toBe('66')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 27 }).codiceGiorno).toBe('67')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 28 }).codiceGiorno).toBe('68')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 29 }).codiceGiorno).toBe('69')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 30 }).codiceGiorno).toBe('70')
        expect(new CodiceFiscale({...mockUserData, sesso: 'F', giorno: 31 }).codiceGiorno).toBe('71')
    })

    test("calcola il codice del comune", ()=>{
        expect(new CodiceFiscale(mockUserData).codiceComune).toBe("F205")
        expect(new CodiceFiscale({...mockUserData, comune: 'Caserta', provincia: 'CE'}).codiceComune).toBe('B963')
        expect(new CodiceFiscale({...mockUserData, comune: 'bolzano', provincia: 'BZ'}).codiceComune).toBe('A952')
        expect(new CodiceFiscale({...mockUserData, comune: 'ROMA', provincia: 'RM'}).codiceComune).toBe('H501')
        expect(new CodiceFiscale({...mockUserData, comune: "Sant'Angelo Romano", provincia: 'RM'}).codiceComune).toBe('I284')
        expect(new CodiceFiscale({...mockUserData, comune: "Acquacanina", provincia: 'MC'}).codiceComune).toBe('A031')
        expect(new CodiceFiscale({...mockUserData, comune: "VIMERCATE", provincia: 'MI'}).codiceComune).toBe('M052')
        expect(new CodiceFiscale({...mockUserData, comune: "CALENDASCO", provincia: 'PC'}).codiceComune).toBe('B405')
    })

    test("calcola il codice anche per stati esteri", ()=>{
        expect(new CodiceFiscale({...mockUserData, comune: 'Albania', provincia: 'EE'}).codiceComune).toBe('Z100')
    })

    test("se il comune o il binomio comune-provincia non esistono lancia un errore", ()=>{
        expect(()=>new CodiceFiscale({...mockUserData, comune: 'Milano', provincia: 'RM'}).codiceComune).toThrow()
        expect(()=>new CodiceFiscale({...mockUserData, comune: 'Paperopoli', provincia: 'CE'}).codiceComune).toThrow()
        expect(()=>new CodiceFiscale({...mockUserData, comune: 'Gotham', provincia: 'EE'}).codiceComune).toThrow()
    })


    test("calcola il codice di controllo", ()=>{
       expect(cf.codiceControllo).toBe('Z')
    })


    test("calcola correttamente il codice fiscale", ()=>{
        expect(cf.toString()).toBe('RSSMRC80A01F205Z')
        expect(new CodiceFiscale({
            nome: 'Luca',
            cognome: 'Moreno',
            sesso: 'M',
            giorno: 1,
            mese: 1,
            anno: 2000,
            comune: 'Roma',
            provincia: 'RM'
        }).toString()).toBe('MRNLCU00A01H501J')

        expect(new CodiceFiscale({
            nome: 'Mario',
            cognome: 'Rossi',
            sesso: 'M',
            giorno: 1,
            mese: 1,
            anno: 1980,
            comune: 'Bolzano',
            provincia: 'BZ'
        }).toString()).toBe('RSSMRA80A01A952F')


        expect(new CodiceFiscale({
            nome: 'Mario',
            cognome: 'Rossi',
            sesso: 'M',
            giorno: 23,
            mese: 6,
            anno: 1980,
            comune: 'Roma',
            provincia: 'RM'
        }).toString()).toBe('RSSMRA80H23H501T')


        expect(new CodiceFiscale({
            nome: 'Maria',
            cognome: 'Rossi',
            sesso: 'F',
            giorno: 23,
            mese: 6,
            anno: 1980,
            comune: 'Roma',
            provincia: 'RM'
        }).toString()).toBe('RSSMRA80H63H501X')

        expect(new CodiceFiscale({
            nome: 'Maria',
            cognome: 'Rossi',
            sesso: 'F',
            giorno: 23,
            mese: 6,
            anno: 1980,
            comune: 'Acquacanina',
            provincia: 'MC'
        }).toString()).toBe("RSSMRA80H63A031H")
        
        expect(new CodiceFiscale({
            nome: 'Maria',
            cognome: 'Rossi',
            sesso: 'F',
            giorno: 23,
            mese: 6,
            anno: 1980,
            comune: 'Vimercate',
            provincia: 'MI'
        }).toString()).toBe("RSSMRA80H63M052A")
     })






 
})
