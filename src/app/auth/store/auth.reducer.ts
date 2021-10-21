import { State } from '@ngrx/store';
import { User } from '../user.model';
import * as fromAuthActions from './auth.actions';

const InitialState:state = {
    user: null,
    authError: null,
    loading : false
}

export interface state{
    user:User,
    authError: string,
    loading: boolean
}


export function AuthReducer(state = InitialState,action:fromAuthActions.AuthActions){
    
    switch(action.type){
        case fromAuthActions.AUTHGENTICATE_SUCCESS:
            const user = new User(action.payload.email,action.payload.id,action.payload.token,action.payload.tokenExpirationDate);
            return {
                ...state,
                user /* equivalent to user: user*/
            }
            break;
        case fromAuthActions.LOGOUT:
            return {
                ...state,
                user:null 
            }
            break;
        case fromAuthActions.LOGIN_START:
          case  fromAuthActions.SIGNUP_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
            break;
        case fromAuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                authError: action.payload,
                user: null
            }
            break;
        case fromAuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }

}