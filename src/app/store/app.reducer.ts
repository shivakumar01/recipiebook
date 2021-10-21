import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRecipies from '../recipies/store/recipies.reducer';




export interface AppState{
    shoppingList: fromShoppingList.state;
    auth: fromAuth.state;
    recipies: fromRecipies.state;
}

export const AppReducer: ActionReducerMap<AppState> = 
    {
        'shoppingList': fromShoppingList.shoppingListReducer,
        auth: fromAuth.AuthReducer,
        recipies: fromRecipies.recipiesReducer
    }
