import React, {useState} from 'react'
import is from 'is_js'
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/action/auth";
import {NavLink} from "react-router-dom";
import {loadingState} from "../store/action/todolist";



export const LogIn =  () => {
    const dispatch = useDispatch()

    const {loginSuccess, token} = useSelector(({auth}) => {
        return {
            loginSuccess: auth.loginSuccess,
            token: !!auth.token
        }
    })

    const [valueInput, setValueInput] = useState([])

    const valueHandler = (email, password) => {
        let mas = [...valueInput]
        mas[0] = email
        mas[1] = password
        setValueInput(mas)
        // console.log(valueInput)
    }
    const validEmail = () => {
       const email = is.email(valueInput[0])
        console.log('Валид эмеил ',email)
    }
    // const logInSuccess = true
    return (
        <form className={'form'}>
            {token ? <div className={'success_login'}>
                    <h1 className={'title dobro'}>Добро пожаловать</h1>
                    <NavLink
                        className={'title nav_link'}
                        to={'/to'}
                        onClick={() => dispatch(loadingState())}
                    >Перейти к приложению</NavLink>
                </div>

                : <React.Fragment>
            <h1 className={'title'}>Авторизация</h1>
            <input type={'email'}
                   placeholder={'email'}
                   value={valueInput[0]}
                   onChange={event => valueHandler(event.target.value, valueInput[1]) }
            />
            <input type={'password'}
                   placeholder={'password'}
                   value={valueInput[1]}
                   onChange={event => valueHandler(valueInput[0],event.target.value)}
            />
            <button type={'button'}
                    className={'button'}
                    onClick={() => dispatch(login(valueInput[0], valueInput[1], true))}
            >Войти</button>
            <button
                type={'button'}
                className={'button'}
                onClick={() => dispatch(login(valueInput[0], valueInput[1], false))}
            >Зарегистрироваться</button>
                </React.Fragment>}
            {/*{false ? <span>Введите верные данные</span> : null}*/}
        </form>
    )
}
// export default LogIn