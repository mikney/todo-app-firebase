import React, {useState} from 'react'
import icon from "../Vector.png";
import {useDispatch, useSelector} from "react-redux";
import {
    activeFolderHandler,
    addFolder,
    addFolderColor,
    addTaskButton,
    deleteFolder, loadingFolderColor, loadingState,
    setValue
} from "../store/action/todolist";
import axios from "axios";

export const NavTodo = () => {
    // const taskFolder = ['Покупки', 'Фронтенд','Сериалы','Книги','Ангилйский']
    // const [activeElem, setActiveElem] = useState('Покупки')
    const masColor = ["yellow", "pink", "red", "green", "purple", "blue", "grey"]
    const dispatch = useDispatch()
    const [color, setColor] = useState(masColor[0]);
    const [eventS, setEvent] = useState('')

    const onSelectColor = (item) => {
        setColor(item)
    }
    const {activeElem, taskList, colorState, emailName,token} = useSelector(({list, auth}) => {
        return {
            activeElem: list.activeItem,
            taskList: list.taskList,
            colorState: list.activeColor,
            emailName: auth.email,
            token: auth.token
        }
    })

    // React.useEffect(() => {
    //     dispatch(loadingState())
    //     dispatch(loadingFolderColor())
    // }, [])
    const eventInput = (e) => {
        setEvent(e.target.value)

    }

    const eventClick = (e) => {
        e.target.value = ''
        console.log('Метод вызвался')
    }
    const [show, setShow] = useState(false)
    // React.useEffect(() => {
    //     dispatch(loadingState())
    //     dispatch(loadingFolderColor())
    // },[])
    // console.log("В стате колор",colorState)
    return (
        <div className={'nav_todo'} >
            {localStorage.getItem('email')}
            <div
                className={activeElem === null ? 'all_task active' : 'all_task'}
                onClick={() => dispatch(activeFolderHandler(null))}
            >
                <img src={icon} alt=""/>
                Все задачи
            </div>
            <ul>
                {taskList && Object.keys(taskList).map((elem, index) => {
                    return <li
                        className={activeElem === elem ? `active ${colorState[elem]}`: `${colorState[elem]}`}
                        key={index}
                        onClick={() => dispatch(activeFolderHandler(elem))}
                    >{elem}
                        {activeElem === elem ? <div
                            className={'delete_task'}
                            onClick={() => dispatch(deleteFolder(activeElem))}
                        >&#x2717;</div> : null}
                    </li>
                })}

                {/*<li className={'blue'}>Фронтэнд</li>*/}
                {/*<li className={'active red'}>Сериалы</li>*/}
                {/*<li className={'yellow'}>Английский</li>*/}
                {/*<li className={'purple'}>Книги</li>*/}
            </ul>

            <div
                className='new_task nav_todo'
                onClick={() => {
                    setShow(!show)
                }}
            >
                Добавить папку
            </div>
            {show ? <React.Fragment>
                        <div className="add_folder">
                            <input
                                type="text"
                                placeholder={'Название папки'}
                                onChange={event => eventInput(event)}
                                value={show ? eventS  : setEvent('')}
                            />
                            {/*(event) => event.target.value*/}
                            <div
                                className='close_handler'
                                onClick={() => setShow(false)}
                            />
                            <div className='color_folder'>
                                {masColor.map((item, index) => {
                                    return <div
                                        key={index}
                                        className={color === item ? `select_color active_item ${item}` : `select_color ${item}`}
                                        onClick={() => onSelectColor(item)}
                                    />
                                })}

                            </div>
                            <button
                            className='button green nav_button '
                            onClick={() => dispatch(addFolderColor(eventS, color, setEvent))}
                            >Добавить</button>
                        </div>
                    </React.Fragment>
                : null
            }

        </div >
    )
}