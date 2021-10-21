import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuthActions from './store/auth.actions';
// import { clear } from 'console';

export interface AuthResponse{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(private http: HttpClient,private router:Router,private store: Store<fromApp.AppState>){

    }

    // user = new BehaviorSubject<User>(null);
    logoutTimer:any;


    signUp(email: string,password:string){

        this.store.dispatch(new fromAuthActions.SignupStart({email,password}));

    //   return  this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseApiKey,
    //     {
    //         email:email,
    //         password:password,
    //         returnSecureToken: true
    //     }).pipe(catchError(this.errorHandler),tap(resData=>{
    //         this.userHandler(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    //     }));
    }


    // login(email:string,password:string){
    //     return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
    //     {
    //         email:email,
    //         password:password,
    //         returnSecureToken: true
    //     }).pipe(catchError(this.errorHandler),tap(resData=>{ 
    //         this.userHandler(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    //     }));
    // }

    // logout(){
    //     // this.user.next(null);
    //     // this.store.dispatch(new fromAuthActions.Logout());
    //     localStorage.removeItem('userData');
    //     clearTimeout(this.logoutTimer);
    //     this.router.navigate(['/auth']);
    // }

    // autologin(){

    //     const loadedUser:{
    //     email: string,id:string, _token:string, _tokenExpirationDate: Date} = JSON.parse(localStorage.getItem('userData'));
    //     if(!loadedUser){
    //         return;
    //     }
        
    //     const newUser = new User(loadedUser.email,loadedUser.id,loadedUser._token,new Date(loadedUser._tokenExpirationDate));

    //     if(newUser.token){
    //     // this.user.next(newUser);
    //     this.store.dispatch(new fromAuthActions.AuthenticateSuccess({
    //         email:loadedUser.email,
    //         id:loadedUser.id,
    //         token:loadedUser._token,
    //         tokenExpirationDate:new Date(loadedUser._tokenExpirationDate)
    //     }))
    //     const expirationDuration = new Date(loadedUser._tokenExpirationDate).getTime() - new Date().getTime();
    //     this.autologout(expirationDuration);
    //     }

    // }

    setTimer(expirationDuration: number){
      this.logoutTimer =   setTimeout(()=>{
          console.log('logging out...');
          this.clearTimer();
          this.store.dispatch(new fromAuthActions.Logout());
          
        },expirationDuration);
    }

    clearTimer(){
        if(this.logoutTimer){
            clearTimeout(this.logoutTimer);
            console.log('inside clear');
            this.router.navigate(['/auth']);
         
            
        }
    }

    // private userHandler(email:string,id:string,token:string,expiresIn:number){
    //     // console.log(new Date().getTime(),' ',expiresIn);
    //     const expiryDate = new Date(new Date().getTime()+expiresIn*1000);
    //     console.log('user token is '+token);
    //     const newuser = new User(email,id,token,expiryDate);
    //     // this.user.next(newuser);
    //     this.store.dispatch(new fromAuthActions.AuthenticateSuccess({
    //         email,id,token,
    //         tokenExpirationDate:expiryDate
    //     }));
    //     this.autologout(expiresIn * 1000);
    //     localStorage.setItem('userData',JSON.stringify(newuser));
    // }

    private errorHandler(err){
        let errorMessage = 'An unkown error occured';
        if(!err.error || !err.error.error){
            return throwError(errorMessage);
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

        return throwError(errorMessage);
    }
}