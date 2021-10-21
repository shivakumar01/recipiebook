import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({providedIn:'root'})
export class AuthGaurd implements CanActivate{

    constructor(private authService: AuthService,private router: Router,private store: Store<fromApp.AppState>){}

    canActivate(route:ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree>  {

        return this.store.select('auth').pipe(take(1),map(authState => {
            return authState.user;
        }),map(user => {
            const isAuth = !!user;

            if(isAuth){
                return true;
            }else{
                return this.router.createUrlTree(['/auth']);
            }
        }));

    }
}