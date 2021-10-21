import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { placeholderDirective } from '../shared/placeholder/placeholder.directive';

@NgModule({
    declarations:[
           LoadingSpinnerComponent,AuthComponent,placeholderDirective
    ],imports:[FormsModule,RouterModule.forChild( [{path: '',component:AuthComponent}]),CommonModule],
    exports:[LoadingSpinnerComponent,placeholderDirective]
})
export class AuthModule{

}