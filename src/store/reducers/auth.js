import {AUTH_LOGOUT, LOGSUCCESS, SETEMAIL, TOKENIN} from "../action/actionTypes";


const initialState =  {
    loginSuccess: false,
    token: null,
    email: '',
}


export  default function authReducer (state=initialState, action) {
    switch (action.type) {
        case SETEMAIL:
            return  {
                ...state,
                email: action.email
            }
        case LOGSUCCESS:
            return {
                ...state,
                loginSuccess: true
            }
        case TOKENIN: {
            return {
                ...state,
                token: action.idToken
            }
        }
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null
            }

        default :
            return {
                ...state
            }
        }
    }
