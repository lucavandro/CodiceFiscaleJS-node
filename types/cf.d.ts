export interface IUserData {
    nome: string;
    cognome: string;
    sesso: string;
    comune: string;
    provincia: string;
    giorno: string;
    mese: number;
    anno: number;
  }

export interface ICodiceFiscaleJSON extends IUserData{
      codice_fiscale: string,
      omocodie: string[]
  }


  declare class CodiceFiscale{
    nome: string;
    cognome: string;
    sesso: string;
    comune: string;
    provincia: string;
    giorno: string;
    mese: number;
    anno: number;
    cf: string;
    toString(): string;
    toJSON(): ICodiceFiscaleJSON;
    getOmocodeList(): string[];
    compute(): void;
    constructor(userData: IUserData);
    getCodiceNome(): string;
    getCodiceCognome(): string;
    getCodiceGiorno(): string;
    getCodiceMese(): string;
    getCodiceAnno(): string;
    getCodiceControllo(): string;
  }

  export default CodiceFiscale