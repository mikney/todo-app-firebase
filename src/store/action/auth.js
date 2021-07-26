import axios from "axios";
import {AUTH_LOGOUT, LOGSUCCESS, SETEMAIL, TESTLOGSUCCESS, TODO_LOGOUT, TOKENIN} from "./actionTypes";
import {loadingState} from "./todolist";

export const login = (email, password, isLogin) => {
    return async (dispatch) => {
        const loginData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0Kdl7J4ki2c-WLd-wkLRwTOF6bnA-hws'
        if(isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0Kdl7J4ki2c-WLd-wkLRwTOF6bnA-hws'
        }
        dispatch(logSuccess())
        dispatch(test())
           const resp = await axios.post(url,loginData)
            console.log('ЛокалИд с сервера ',resp.data.localId)
            // dispatch(() => 200logSuccess())
        const exceptionDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000)
        localStorage.setItem('token', resp.data.idToken)
        localStorage.setItem('userId', resp.data.localId)
        localStorage.setItem('exceptionDate', exceptionDate )
        localStorage.setItem('email', resp.data.email)
         // await dispatch(loadingState())
        dispatch(tokenIn(resp.data.idToken))
        dispatch(autoLogout(resp.data.expiresIn))
        // dispatch(emailName(resp.data.email))
    }
}
export const emailName = (email) => {
    return {
        type: SETEMAIL,
        email
    }
}
export const tokenIn = (idToken) => {
    return {
        type: TOKENIN,
        idToken
    }
}

export const autoLogout = (expiresIn) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresIn * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('exceptionDate')
    localStorage.removeItem('email')
    return dispatch => {
        dispatch(logoutAuth())
        dispatch(logoutTodoList())
    }
}
export const logoutAuth = () => {
    return {
        type: AUTH_LOGOUT
    }
}
export const logoutTodoList = () => {
    return {
        type: TODO_LOGOUT
    }
}

export const logSuccess = () => {
    return {
        type: LOGSUCCESS
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(logout())
        } else {
            const exceptionDate = new Date(localStorage.getItem('exceptionDate'))
            if (exceptionDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(tokenIn(token))
                dispatch(autoLogout((exceptionDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export const test = () => {
    return {
        type: 'TEST'
    }
}