import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromRecipieActions from './recipies.actions';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipie } from '../recipie.model';
import { Injectable } from '@angular/core';

@Injectable()
export class recipieEffects {
    @Effect()
    FETCH_RECIPIES = this.action$.pipe(
        ofType(fromRecipieActions.FETCH_RECIPIES),
        switchMap(() => {
            return this.http.get<Recipie[]>('https://recipie-book-course.firebaseio.com/recipies.json')
        .pipe(map(data => {

            return data.map(recipie =>{
                return {...recipie,ingridients: recipie.ingridients?recipie.ingridients:[]}
            });
            
        }),map(recipies =>{
           return new fromRecipieActions.selectRecipie(recipies);
        }));
        })
    );


    constructor(private action$: Actions,private http:HttpClient){

    }
}