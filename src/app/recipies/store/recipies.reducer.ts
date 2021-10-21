import { Recipie } from '../recipie.model';
import * as fromRecipieAction from './recipies.actions';
import { startEdit } from 'src/app/shopping-list/store/shopping-list.action';
import { act } from '@ngrx/effects';

export interface state{
    recipies: Recipie[];
}

const initialState: state = {
    recipies : []
}


export function recipiesReducer(state = initialState,action: fromRecipieAction.recipiesActions){
    console.log('recipie reducer called');

    switch(action.type){
        case fromRecipieAction.SELECT_RECIPIE:
            console.log('inside reducer of recipies');
                return {
                    ...state,
                    recipies: [...action.payload]
                }
            break;
        case fromRecipieAction.ADD_RECIPIE:
                return {
                    ...state,
                    recipies: [...state.recipies,action.payload]
                }
            break;
        case fromRecipieAction.UPDATE_RECIPIE:
            const updatedRecipie = [
                ...state.recipies
            ]
            updatedRecipie[action.payload.index] = action.payload.recipie;
                return {
                    ...state,
                    updatedRecipie
                }
            break;
        case fromRecipieAction.DELETE_RECIPIE:
                return {
                    ...state,
                    recipies: state.recipies.filter((recipie,index)=>{
                        return index != action.payload
                    })
                }
            break;
    }

}