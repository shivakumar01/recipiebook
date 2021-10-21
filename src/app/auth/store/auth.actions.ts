import { Action } from '@ngrx/store';


export const AUTHGENTICATE_SUCCESS = '[AUTH] AUTHGENTICATE_SUCCESS';
export const LOGOUT = '[AUTH] LOGOUT';
export const LOGIN_START = '[AUTH] LOGIN START';
export const AUTHENTICATE_FAIL = '[AUTH] AUTHENTICATE_FAIL';
export const SIGNUP_START = '[AUTH] SIGNUP_START';
export const CLEAR_ERROR = '[AUTH] CLEAR_ERROR';
export const AUTO_LOGIN = '[AUTH] AUTO_LOGIN';

export class SignupStart implements Action{
    readonly type = SIGNUP_START;

    constructor(public payload: {email: string,password: string}){

    }
}

export class AuthenticateSuccess implements Action{
    readonly type = AUTHGENTICATE_SUCCESS;

    constructor(public payload:{email: string,id:string,token:string,tokenExpirationDate: Date,redirect: boolean}){

    }
}

export class Logout implements Action{
    readonly type = LOGOUT;
}

export class LoginStart implements Action{
    readonly type = LOGIN_START;

    constructor(public payload:{email: string,password: string}){

    }
}
export class AuthenticateFail implements Action{
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload : string){

    }
}

export class clearError implements Action{
    readonly type = CLEAR_ERROR;


}

export class AutoLogin implements Action{
    readonly type = AUTO_LOGIN;

    constructor(){
        
    }
}

export type AuthActions = AuthenticateSuccess|Logout|LoginStart|AuthenticateFail|clearError|SignupStart;