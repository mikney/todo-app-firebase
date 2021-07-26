import React from 'react'
// import './App.css';
import icon from './Vector.png'
import {NavTodo} from "./components/NavTodo";
import {TodoList} from "./components/TodoList";
import axios from "./axios/axios";
import {useDispatch, useSelector} from "react-redux";
import {loadingFolderColor, loadingState} from "./store/action/todolist";
import {Redirect, Route, Switch} from "react-router-dom";
import {LogIn} from "./pages/LogIn";
import {autoLogin} from "./store/action/auth";


function App() {
    const dispatch = useDispatch()
    React.useEffect(async () => {
        // try {
        //   const response = await axios.get('https://todoapp-fe6c9-default-rtdb.firebaseio.com/state.json')
        //     console.log(response.data)
        // } catch (e) {
        //     console.log(e)
        // }
        dispatch(autoLogin())
    },[])


    const {loginSuccess, token} = useSelector(({auth}) => {
        return {
            loginSuccess: auth.loginSuccess,
            token: !!auth.token
        }
    })


    const App = () => {
        // dispatch(loadingState())
        // dispatch(loadingFolderColor())
        return (
            <div className="container">
                <NavTodo />
                <TodoList />
            </div>
        )
    }
    // const isAuthenticated = false
  return (
    <div className="App">

            {!token ? <Switch>
                    <Route path='/login' component={LogIn}/>
                    <Redirect to={'/login'}/>
                </Switch>
            : <Switch>

                <Route path='/' exact component={App}/>
                    <Route path='/login' component={LogIn}/>
                    <Redirect to={'/'}/>
                </Switch>
            }
            {/*<Route path='/' component={App}/>*/}
            {/*<Route path='/login' component={LogIn}/>*/}
    </div>
  );
}

export default App;
