import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { shoppingListRouting } from './shopping-list.routing';


@NgModule({
    declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
    ],
    imports:[
        FormsModule,CommonModule,shoppingListRouting
    ],
    exports:[
        
    ]
})

export class shoppingListModule{

}