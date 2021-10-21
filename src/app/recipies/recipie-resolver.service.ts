import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipie } from './recipie.model';
import { DataStoringService } from '../shared/data-storing.service';
import { RecipieService } from './recipie.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromRecipiesAction from './store/recipies.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class RecipieResolverService implements Resolve<Recipie[]>{
    constructor(private store:Store<fromApp.AppState>,private action$: Actions){

    }
    
    resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
       this.store.dispatch(new fromRecipiesAction.fetchRecipies);

      return this.action$.pipe(ofType(fromRecipiesAction.SELECT_RECIPIE),take(1));
    }
}