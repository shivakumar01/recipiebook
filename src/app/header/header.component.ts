
import {Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { DataStoringService } from '../shared/data-storing.service';
import { AuthService } from '../auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromAuthActions from '../auth/store/auth.actions';
import { Router } from '@angular/router';
import * as fromRecipiesActions from '../recipies/store/recipies.actions';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
})

export class HeaderComponent implements OnInit,OnDestroy{

    constructor(private dataService: DataStoringService,private authService: AuthService,
       private store: Store<fromApp.AppState>){

    }

    isAuthenticated:boolean = false;
    userObs:Subscription;

    ngOnInit(){
       this.userObs =  this.store.select('auth').pipe(map(authState => {
        return authState.user
    })).subscribe(user => {
            this.isAuthenticated = !!user;
       });
    }


    onSaveData(){
        this.dataService.storeRecipies();
    }

    onFetchData(){
        this.store.dispatch(new fromRecipiesActions.fetchRecipies());
    }

    ngOnDestroy(){
        this.userObs.unsubscribe();
    }

    onlogout(){
        localStorage.removeItem('userData');
        this.authService.clearTimer();
        this.store.dispatch(new fromAuthActions.Logout());
        // this.router.navigate(['/']);
    }
 

}