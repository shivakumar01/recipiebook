import { Ingridient } from '../../shared/ingridient.model';
import { Action, Store } from '@ngrx/store';
import * as shoppingListActions from './shopping-list.action';

export interface state{
    ingridients: Ingridient[];
    editedIngridient: Ingridient;
    editedIngridientIndex:number;
}

export interface AppState{
    shoppingList:state;
}


const initialState:state = {
    ingridients:  [
        new Ingridient('Apples',5),
        new Ingridient('Tomatoes',10)
      ],
    editedIngridient:null,
    editedIngridientIndex: -1
}

export function shoppingListReducer(state = initialState, action:shoppingListActions.shoppingListActionsList){
    
    switch(action.type){
        case shoppingListActions.ADD_INGRIDIENT:
            return {
                ...state,
                ingridients: [...state.ingridients,action.payload]
            }
        break;
        case shoppingListActions.ADD_INGRIDIENTS:
            return {
                ...state,
                ingridients: [...state.ingridients,...action.payload]
            }
            break;
        case shoppingListActions.UPDATE_INGRIDIENT:
            
            const ingridient = state.ingridients[state.editedIngridientIndex];
            const updatedIngridient = {
                ...ingridient,
                ...action.payload
            }
            const ingridients = [...state.ingridients];

            ingridients[state.editedIngridientIndex] = updatedIngridient;

            return {
                ...state,
                ingridients:[...ingridients]
            }    
            break;
          case shoppingListActions.DELETE_INGRIDIENT:

            // const ingridientsClone = state.ingridients;
            // ingridientsClone.splice(action.payload,1);
            return {
                ...state,
                ingridients: state.ingridients.filter((ig,igIndex)=>{
                    return igIndex!=state.editedIngridientIndex;
                })
            }
              break; 
         case shoppingListActions.START_EDIT:
                return {
                    ...state,
                    editedIngridient : {...state.ingridients[action.payload]},
                    editedIngridientIndex: action.payload
                }
             break;
         case shoppingListActions.STOP_EDIT:
             return{
                 ...state,
                 editedIngridient:null,
                 editedIngridientIndex:-1
             } 
        default: 
        return state;
    }

}