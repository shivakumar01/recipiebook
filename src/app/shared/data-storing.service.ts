import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipieService } from '../recipies/recipie.service';
import { Recipie } from '../recipies/recipie.model';
import {map,tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import * as fromAPP from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromRecipieActions from '../recipies/store/recipies.actions';
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class DataStoringService{
    constructor(private http: HttpClient,private recipieService:RecipieService,private authService: AuthService,
        private store: Store<fromAPP.AppState>){
        
    }
    recipies: Recipie[];

    storeRecipies(){
        this.recipies = this.recipieService.getRecipies();
        this.http.put('https://recipie-book-course.firebaseio.com/recipies.json',this.recipies)
        .subscribe();
    }

    fetchRecipie(){
            console.log('inside data storing service');
        //     return this.http.get<Recipie[]>('https://recipie-book-course.firebaseio.com/recipies.json')
        // .pipe(map(data => {

        //     return data.map(recipie =>{
        //         return {...recipie,ingridients: recipie.ingridients?recipie.ingridients:[]}
        //     });
            
        // }),tap(recipies =>{
        //     this.store.dispatch(new fromRecipieActions.selectRecipie(recipies));
        // }));
    }
}