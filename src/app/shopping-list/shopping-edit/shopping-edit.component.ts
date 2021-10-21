import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingridient } from 'src/app/shared/ingridient.model';
import { shoppingListService } from '../shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Store} from '@ngrx/store';
import * as shoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  selectedItem: Ingridient;
  selectedIndex: number;
  EditMode: boolean = false;
  buttonDisplay:string = 'ADD';
  @ViewChild('f') form: NgForm;

  constructor(private shoppinglistService: shoppingListService,private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.store.select('shoppingList').subscribe(currentState => {
      if(currentState.editedIngridientIndex> -1){
        this.EditMode = true;
        this.selectedItem = currentState.editedIngridient;
        this.form.setValue({
          name : this.selectedItem.name,
          amount : this.selectedItem.amount
        });
        this.buttonDisplay = 'UPDATE';
      }else{
        this.EditMode = false;
      }
    });

    // this.shoppinglistService.editSelected.subscribe(
    //   (index: number)=>{
    //     this.selectedIndex = index;
    //     this.selectedItem = this.shoppinglistService.getIngridient(index);
    //     this.form.setValue({
    //       name : this.selectedItem.name,
    //       amount : this.selectedItem.amount
    //     });
    //     this.EditMode = true;
    //   
    //   }
    
  }

  onAddItem(form:NgForm){

    const value = form.value;
    console.log('inside add item '+ this.EditMode+' '+ this.selectedIndex);
    console.log('check');
    
      if(!this.EditMode)
      {
      console.log(form.controls);
      // this.shoppinglistService.addIngridient(new Ingridient(value.name,value.amount));
      console.log('state is '+value.name);
      this.store.dispatch(new shoppingListActions.Add_ingridient(new Ingridient(value.name,value.amount)));
      }else{
        this.EditMode = false;
        this.buttonDisplay = 'ADD';
        console.log(this.selectedIndex);
      // this.shoppinglistService.setIngridient(this.selectedInd/ex,new Ingridient(value.name,value.amount));
      this.store.dispatch(new shoppingListActions.updateIngridient(new Ingridient(value.name,value.amount)));
      form.reset();
      }
    
    
    console.log(form);
  }

  onClear(){
    this.form.reset();
    this.buttonDisplay = 'ADD';
    this.EditMode = false;
    this.store.dispatch(new shoppingListActions.stopEdit());
  }

  onDelete(){
    console.log(this.selectedIndex);
    // this.shoppinglistService.deleteIngridient(this.selectedIndex);
    this.store.dispatch(new shoppingListActions.deleteIngridient());

    this.form.reset();
    this.buttonDisplay = 'ADD';
    this.EditMode = false;
  }

}
