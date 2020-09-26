const { CHECK_CODE_EVEN, CHECK_CODE_ODD, CHECK_CODE_CHARS, OMOCODIA_TABLE, OMOCODIA_TABLE_INVERSE } = require("./constants")

const normalizeString = (str)=> {
    return str.trim()
      .replace(new RegExp(/[àá]/g), 'a\'')
      .replace(new RegExp(/[èé]/g), 'e\'')
      .replace(new RegExp(/[ìí]/g), 'i\'')
      .replace(new RegExp(/[òó]/g), 'o\'')
      .replace(new RegExp(/[ùú]/g), 'u\'')
      .toUpperCase()
  }

const daysInMonth = (mese, anno)=> {
    switch (mese){
      case 2:
        return anno % 4 === 0 ? 29 : 28
      case 4:
      case 6:
      case 9:
      case 11:
        return 30
      default:
        return 31
    }
  }
const isValidDate = ({giorno, mese, anno})=> {
    const annoLength = anno.toString().length
    if(annoLength !== 2 && annoLength !== 4)
      return false
    return mese >= 1 && mese <= 12 && giorno > 0 && giorno <= daysInMonth(mese, anno)
}

const getValidDate= ({day, month, year})=> {
    if (typeof day === 'string' && month === undefined && year === undefined){
        return new Date(day)
    } else if (isValidDate(day, month, year)){
        return new Date(year, month - 1, day, 0, 0, 0, 0)
    } else {
        throw new Error(`The date ${year}/${month}/${day} is not a valid date`)
    }
}
const extractVowels = (str)=> {
    return str.replace(/[^AEIOU]/gi, '')
}
const extractConsonants = (str)=> {
    return str.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/gi, '')
}


const computeControlCode = (partialCF)=>{
  let val = 0
  for (let i = 0; i < 15; i++) {
    const c = partialCF.charAt(i)
    val += i % 2 !== 0 ? CHECK_CODE_EVEN[c] : CHECK_CODE_ODD[c]
  }

  return CHECK_CODE_CHARS.charAt(val % 26)
}


const isValid = (cf)=>{
  if(cf.length != 16)
    return false
  
  const cf15 = cf.substr(0,15)
  const controlCode = cf.charAt(15)
  
  return computeControlCode(cf15) === controlCode
}

const computeOmocodeList = (cf)=>{
  
  let code
  if(cf.length === 15){
    code = cf
  } else if (cf.length > 15){
    code = cf.substr(0,15)
  } else {
    throw Error(`Can't compute omocodie for ${cf}`)
  }

  const omocodeList = []
  let lastOmocode = code;
  for (let i = 15; i >= 0; i--) {
    const char = code.charAt(i)
    if (char.match(/\d/) !== null) {
      lastOmocode = `${lastOmocode.substr(0, i)}${OMOCODIA_TABLE[char]}${lastOmocode.substr(i + 1)}`
      omocodeList.push(lastOmocode + computeControlCode(lastOmocode))
    }
  }
  return omocodeList
  
}

const toNumberIfOmocodia = (input)=>{
  if (isNaN(input)) {
    input = [...input].map((c) => isNaN(c) ?  OMOCODIA_TABLE_INVERSE[c] : c);
    input = input.join('');
  }
  return input
}
module.exports = {
    normalizeString,
    daysInMonth,
    isValidDate,
    extractConsonants,
    extractVowels,
    computeControlCode,
    computeOmocodeList,
    isValid,
    toNumberIfOmocodia
}