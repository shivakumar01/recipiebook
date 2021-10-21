import { Component, OnInit } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model'
import { shoppingListService } from './shoppinglist.service';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import * as shoppingListActions  from './store/shopping-list.action';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers:[]
})
export class ShoppingListComponent implements OnInit {
  
  ingridients : Observable<{ingridients:Ingridient[]}>;

  constructor(private shoppinglistService: shoppingListService,private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingridients = this.store.select('shoppingList');
  }

  onEdit(index){
    // this.shoppinglistService.editSelected.next(index);
     this.store.dispatch(new shoppingListActions.startEdit(index));
  }

  itemAddEvent(newItem: Ingridient){
    this.shoppinglistService.addIngridient(newItem);
  }

  

}
