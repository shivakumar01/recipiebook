import { Actions, ofType, Effect } from '@ngrx/effects';
import * as fromAuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponse{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?: boolean;
}


const handleAuth = (user)=>{
    console.log(' user is ');
    console.log(user);
    const expiryDate = new Date(new Date().getTime()+ +user.expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(user));
    return new fromAuthActions.AuthenticateSuccess({
        email: user.email,
        id: user.localId,
        token: user.token,
        tokenExpirationDate: expiryDate,
        redirect: true},);
}

const handleError = (err)=>{
    let errorMessage = 'An unkown error occured';
    if(!err.error || !err.error.error){
        return of(new fromAuthActions.AuthenticateFail(errorMessage));
    }

    switch(err.error.error.message){
        case 'EMAIL_EXISTS':
            errorMessage = 'Email already exists';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email does not exists';
            break;
        case 'INVALID_PASSWORD':
                errorMessage = 'Password is not correct';
                break;
    }
    return of(new fromAuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects{



    @Effect()
    suthSignUp = this.actions$.pipe(
        ofType(fromAuthActions.SIGNUP_START),
        switchMap((authState: fromAuthActions.SignupStart) => {
            return  this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseApiKey,
            {
                email:authState.payload.email,
                password:authState.payload.password,
                returnSecureToken: true
            }).pipe(tap(userData => {
                this.authService.setTimer(+userData.expiresIn*1000);
            }

            ),map(user=>{
                return handleAuth(user);
            }),catchError(err => {
                return handleError(err);
            }));
        })
    )

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(fromAuthActions.LOGIN_START),
        switchMap((authData: fromAuthActions.LoginStart) => {
            return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseApiKey,
            {
                email:authData.payload.email,
                password:authData.payload.password,
                returnSecureToken: true
            }).pipe(tap(userData => {
                this.authService.setTimer(+userData.expiresIn*1000);
            }

            ),map(user => { 
                return handleAuth(user);
            }),catchError(err => {
               return handleError(err);
            }));
     
        })
    );

    @Effect({dispatch:false})
    authSuceess = this.actions$.pipe(
        ofType(fromAuthActions.AUTHGENTICATE_SUCCESS),
        tap((authSuccessAction: fromAuthActions.AuthenticateSuccess)=>{
            if(authSuccessAction.payload.redirect){
            this.router.navigate(['/']);
            }
        })
    )


    @Effect()
    autoLogin = this.actions$.pipe(ofType(fromAuthActions.AUTO_LOGIN),
        map(()=>{
            const loadedUser:{
                email: string,localId:string, idToken:string, expiresIn: Date} = JSON.parse(localStorage.getItem('userData'));
                if(!loadedUser){
                    console.log('here');
                    return { type : 'DUMMY'};
                }
                console.log(loadedUser);
                const newUser = new User(loadedUser.email,loadedUser.localId,loadedUser.idToken,new Date(new Date().getTime()+ +loadedUser.expiresIn*1000));
                console.log('new user is');
                console.log(newUser);

                if(newUser.token){
                // this.user.next(newUser);
                this.authService.setTimer(+loadedUser.expiresIn*1000);
                console.log('here 2 ');
                return new fromAuthActions.AuthenticateSuccess({
                    email:loadedUser.email,
                    id:loadedUser.localId,
                    token:loadedUser.idToken,
                    tokenExpirationDate:new Date(loadedUser.expiresIn),
                    redirect:false
                });
                // const expirationDuration = new Date(loadedUser._tokenExpirationDate).getTime() - new Date().getTime();
                // this.autologout(expirationDuration);
                }

                return {type:'DUMMY'};
        }));

    constructor(private actions$: Actions,private http:HttpClient,private router:Router,private authService: AuthService){

    }
}