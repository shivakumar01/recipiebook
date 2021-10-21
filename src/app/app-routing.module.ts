import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
    {path:'',redirectTo:'recipies',pathMatch:'full'},
    {path:'recipies',loadChildren:()=>import('./recipies/recipies.module').then(m=>m.recipiesModule)},
    {path: 'shopping-list', loadChildren:()=>import('./shopping-list/shopping-list.module').then(m=>m.shoppingListModule)},
    {path: 'auth',loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({

    imports:[RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
    exports:[RouterModule]

})




export class AppRouting{

}