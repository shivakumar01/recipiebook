import { NgModule } from '@angular/core';
import { shoppingListService } from './shopping-list/shoppinglist.service';
import { RecipieService } from './recipies/recipie.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
    providers:[
        shoppingListService,RecipieService,{provide: HTTP_INTERCEPTORS, useClass : AuthInterceptorService,multi:true}
    ]
})
export class coreModule{
    
}