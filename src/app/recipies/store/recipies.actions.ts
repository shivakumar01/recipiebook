import { Action } from '@ngrx/store';
import { Recipie } from '../recipie.model';
import { Actions } from '@ngrx/store-devtools/src/reducer';

export const SELECT_RECIPIE = '[RECIPIE] SELECT RECIPIE';
export const FETCH_RECIPIES = '[RECIPIE] FETCH RECIPIES';
export const ADD_RECIPIE = '[RECIPIE] ADD RECIPIE';
export const UPDATE_RECIPIE = '[RECIPIE] UPDATE RECIPIE';
export const DELETE_RECIPIE = '[RECIPIE] DELETE RECIPIE';

export class selectRecipie implements Action{
    readonly type = SELECT_RECIPIE;

    constructor(public payload: Recipie[]){

    }
}

export class fetchRecipies implements Action{
    readonly type = FETCH_RECIPIES;
}

export class addRecipie implements Action{
    readonly type = ADD_RECIPIE;

    constructor(public payload:Recipie){

    }
}

export class updateRecipie implements Action{
    readonly type = UPDATE_RECIPIE;

    constructor(public payload :{index: number, recipie: Recipie}){

    }
}

export class deleteRecipie implements Action{
    readonly type = DELETE_RECIPIE;

    constructor(public payload:number){

    }
}

export type recipiesActions = selectRecipie|fetchRecipies|addRecipie|updateRecipie|deleteRecipie;