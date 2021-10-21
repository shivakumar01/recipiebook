import { Action } from '@ngrx/store';
import { Ingridient } from 'src/app/shared/ingridient.model';

export const ADD_INGRIDIENT = 'ADD_INGRIDIENT';
export const ADD_INGRIDIENTS = 'ADD_INGRIDIENTS';
export const UPDATE_INGRIDIENT = 'UPDATE_INGRIDIENT';
export const DELETE_INGRIDIENT = 'DELETE_INGRIDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class Add_ingridient implements Action{
    readonly type= ADD_INGRIDIENT;

    constructor(public payload: Ingridient){

    }
}

export class AddIngridients implements Action{
    readonly type= ADD_INGRIDIENTS;

    constructor(public payload: Ingridient[]){

    }
}

export class updateIngridient implements Action{
    readonly type = UPDATE_INGRIDIENT;

    constructor(public payload:Ingridient){

    }
}

export class deleteIngridient implements Action{
    readonly type = DELETE_INGRIDIENT;
    
}

export class startEdit implements Action{
    readonly type = START_EDIT;

    constructor(public payload:number){

    }
}

export class stopEdit implements Action{
    readonly type = STOP_EDIT;
}

export type shoppingListActionsList = Add_ingridient |AddIngridients | updateIngridient 
                                      |deleteIngridient |startEdit|stopEdit;