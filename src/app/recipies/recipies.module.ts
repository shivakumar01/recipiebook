import { NgModule } from '@angular/core';
import { RecipiesComponent } from './recipies.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipieItemComponent } from './recipie-list/recipie-item/recipie-item.component';
import { RecipieStartComponent } from '../recipie-start/recipie-start.component';
import { RecipieEditComponent } from './recipie-edit/recipie-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { recipiesRouting } from './recipies.routing';
import { RouterModule } from '@angular/router';
import { sharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        RecipiesComponent,
        RecipieListComponent,
        RecipieDetailComponent,
        RecipieItemComponent,
        RecipieStartComponent,
        RecipieEditComponent
    ],
    imports:[
        ReactiveFormsModule,RouterModule ,recipiesRouting,CommonModule,sharedModule
    ],
    exports:[
    ]
})

export class recipiesModule{

}