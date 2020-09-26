import {IUserData, CodiceFiscale} from './cf'

export declare function compute(userData: IUserData): string
export declare function reverse(cf:string): IUserData
export declare function validate(cf:string): IUserData
