import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipiesComponent } from './recipies.component';
import { RecipieStartComponent } from '../recipie-start/recipie-start.component';
import { RecipieEditComponent } from './recipie-edit/recipie-edit.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipieResolverService } from './recipie-resolver.service';
import { AuthGaurd } from '../auth/auth.gaurd';


const routes:Routes = [{path: '', component: RecipiesComponent,
children :[
    {path: '',component: RecipieStartComponent},
    {path:'new',component:RecipieEditComponent},
    {path: ':id',component: RecipieDetailComponent,resolve: [RecipieResolverService]},
    {path: ':id/edit',component: RecipieEditComponent,resolve: [RecipieResolverService]},
    
],
canActivate : [AuthGaurd]}]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class recipiesRouting{

}