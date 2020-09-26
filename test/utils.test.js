const {daysInMonth, isValidDate,computeOmocodeList, isValid} = require('../src/lib/utils');

describe('daysInMonth ', ()=>{

    test('is defined', () => {
        expect(daysInMonth).toBeDefined()
    });


    test('is a function', () => {
        expect(typeof daysInMonth).toBe('function')
    });

    test('works with standard (no leap) years', () => {
        expect(daysInMonth(1,1997)).toBe(31)
        expect(daysInMonth(2,1998)).toBe(28)
        expect(daysInMonth(3,1999)).toBe(31)
        expect(daysInMonth(4,2001)).toBe(30)
        expect(daysInMonth(5,2002)).toBe(31)
        expect(daysInMonth(6,2003)).toBe(30)
        expect(daysInMonth(7,2005)).toBe(31)
        expect(daysInMonth(8,2006)).toBe(31)
        expect(daysInMonth(9,2007)).toBe(30)
        expect(daysInMonth(10,2009)).toBe(31)
        expect(daysInMonth(11,2010)).toBe(30)
        expect(daysInMonth(12,2011)).toBe(31)
    });


    test('works with leap years', () => {
        expect(daysInMonth(1,1992)).toBe(31)
        expect(daysInMonth(2,1996)).toBe(29)
        expect(daysInMonth(3,2000)).toBe(31)
        expect(daysInMonth(4,2004)).toBe(30)
        expect(daysInMonth(5,2008)).toBe(31)
        expect(daysInMonth(6,2012)).toBe(30)
        expect(daysInMonth(7,2016)).toBe(31)
        expect(daysInMonth(8,2020)).toBe(31)
        expect(daysInMonth(9,2024)).toBe(30)
        expect(daysInMonth(10,2028)).toBe(31)
        expect(daysInMonth(11,2032)).toBe(30)
        expect(daysInMonth(12,2036)).toBe(31)
        // February is rather important 😁
        expect(daysInMonth(2,1992)).toBe(29)
        expect(daysInMonth(2,1996)).toBe(29)
        expect(daysInMonth(2,2000)).toBe(29)
        expect(daysInMonth(2,2004)).toBe(29)
        expect(daysInMonth(2,2008)).toBe(29)
        expect(daysInMonth(2,2012)).toBe(29)
        expect(daysInMonth(2,2016)).toBe(29)
        expect(daysInMonth(2,2020)).toBe(29)
        expect(daysInMonth(2,2024)).toBe(29)
        expect(daysInMonth(2,2028)).toBe(29)
        expect(daysInMonth(2,2032)).toBe(29)
        expect(daysInMonth(2,2036)).toBe(29)
    });

});


describe('isValidDate', ()=>{

    test('is defined', () => {
        expect(isValidDate).toBeDefined()
    });


    test('is a function', () => {
        expect(typeof isValidDate).toBe('function')
    });

    test('which detects valid dates', () => {
        expect(isValidDate({giorno: 31, mese: 1, anno: 1990 })).toBe(true)
        expect(isValidDate({giorno: 29, mese: 2, anno: 1992 })).toBe(true)
        expect(isValidDate({giorno: 28, mese: 2, anno: 1993 })).toBe(true)
    });

    test('which detects valid dates', () => {
        expect(isValidDate({giorno: 32, mese: 1, anno: 1990 })).toBe(false)
        expect(isValidDate({giorno: 29, mese: 2, anno: 1991 })).toBe(false)
        expect(isValidDate({giorno: 31, mese: 4, anno: 1991 })).toBe(false)
        expect(isValidDate({giorno: -1, mese: 4, anno: 1991 })).toBe(false)
        expect(isValidDate({giorno: 0, mese: 5, anno: 1991 })).toBe(false)
        expect(isValidDate({giorno: 0, mese: 13, anno: 1991 })).toBe(false)
    });

})


describe('computeOmocodeList',()=>{
    test('is a function',()=>{
        expect(typeof computeOmocodeList).toBe('function')
    })

    test('compute omocode List for a given fiscale', () => {
        expect(computeOmocodeList('RSSFLV95C12H118C'))
         .toEqual(expect.arrayContaining(['RSSFLV95C12H11UZ']))
        
         expect(computeOmocodeList('BNZVCN32S10E573Z'))
         .toEqual(expect.arrayContaining(['BNZVCN32S10E57PV', 'BNZVCNPNSMLERTPX']))

         expect(computeOmocodeList('BNZVCN32S10E573Z').length).toEqual(7)
    })
})


describe('isValid',()=>{
    test('is a function',()=>{
        expect(typeof isValid).toBe('function')
    })

    test('that check if a codice fiscale is valid', () => {
        expect(isValid('MRNLCU00A01H501J')).toBe(true)
        expect(isValid('VNDLDL87D07B963O')).toBe(true)
        expect(isValid('RSSMRC80A01F205Z')).toBe(true)
    })

    
    test('that check if a codice fiscale is NOT valid', () => {
        expect(isValid('')).toBe(false)
        expect(isValid('MRNLCU00A01H501M')).toBe(false)
        expect(isValid('RSSMRC80A01F205G')).toBe(false)
        expect(isValid('RSKMRC80A01F205Z')).toBe(false)
        expect(isValid('RSKMRC81A01F205Z')).toBe(false)
        expect(isValid('RSSMRC80A01F205')).toBe(false)
        expect(isValid('RSSMRC80A01F205L')).toBe(false)
    })
})