import { Injectable, EventEmitter } from '@angular/core';
import { Recipie } from './recipie.model';
import { Ingridient } from '../shared/ingridient.model';
import { shoppingListService } from '../shopping-list/shoppinglist.service';
import { Subject } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../shopping-list/store/shopping-list.action';
// import { AddIngridients } from '../shopping-list/store/shopping-list.action';
;

@Injectable()
export class RecipieService{

    recipesSubject = new Subject<Recipie[]>();

    // private Recipies: Recipie[] = [ 
    //     new Recipie("test recipie","this a dummy one","https://www.cubesnjuliennes.com/wp-content/uploads/2019/02/Chicken-Biryani-Recipe.jpg",[new Ingridient('pineapple',1),new Ingridient('mango',10)]),
    //     new Recipie("test recipie 1","this a dummy one 2","https://www.cubesnjuliennes.com/wp-content/uploads/2019/02/Chicken-Biryani-Recipe.jpg",[new Ingridient('pineapple',1)])
    // ];

    private Recipies: Recipie[] = [];

    constructor(private shoppinglistService: shoppingListService,
        private router:Router,private store: Store<{shoppingList:{ingridients:Ingridient[]}}>){
    }

    getRecipies(){
        return this.Recipies.slice();
    }

    setRecipies(recipes){
        this.Recipies=recipes;
        console.log(this.Recipies);
        this.recipesSubject.next(this.Recipies.slice());
    }

    sendToShoppingList(ingridients: Ingridient[]){
        // this.shoppinglistService.addIngridients(ingridients);
        this.store.dispatch(new shoppingListActions.AddIngridients(ingridients));
    }

    getRecipie(id){
        console.log('here '+id);
        console.log(this.Recipies);
        return this.Recipies[id];
    }

    updateRecipie(id:number,recipie: Recipie){

        this.Recipies[id] = recipie;
        this.recipesSubject.next(this.Recipies);

    }

    addRecipie(recipie: Recipie){

        this.Recipies.push(recipie);
        this.recipesSubject.next(this.Recipies);

    }

    deleteRecipie(id:number){
        
        this.Recipies.splice(id,1);
        this.recipesSubject.next(this.Recipies);
    }

}