import React, {useState} from 'react'
import icon from "../Vector.png";
import {useDispatch, useSelector} from "react-redux";
import {addTaskButton, deleteTask} from "../store/action/todolist";
import {logout} from "../store/action/auth";

export const TodoList = () => {

    const {taskList, activeItem, color} = useSelector(({list}) => {
        return {
            taskList: list.taskList,
            activeItem: list.activeItem,
            color: list.activeColor
        }
    })
    const dispatch = useDispatch()
    const [addTask, setAddTask] = useState(true)
    const [activeTask, setActiveTask] = useState(taskList && taskList[0])
    const [event, setEvent] = useState('')
    const [folder, activeFolder] = useState('')
    const onClickLi = (elem) => {
        setActiveTask(elem)
        console.log('Вызов пошел')
        let b = 0
        Object.keys(taskList).forEach(key => {
            b = taskList[key].indexOf(elem)
            if(b !== -1) {

                console.log(key)
                return activeFolder(key)
            }
        })
    }

    // console.log(taskList[activeItem])
    const addTaskHandler = (action) => {
        setAddTask(action)
    }
    const eventInput = (e) => {
        setEvent(e.target.value)
    }
    // console.log(color['add'])
    // const findActiveFolder = () => {
    //
    //    return   Object.keys(taskList).map(key => {
    //         const b = taskList[key].indexOf(activeTask)
    //         if(b === 1) {
    //
    //             console.log(key)
    //             return key
    //         }
    //     })
    // }
    // findActiveFolder()
    return (
        <div className="todo_list">
            <div
                className={'logout'}
                onClick={() => dispatch(logout())}
            >Выйти</div>
            {activeItem === null ? taskList && Object.keys(taskList).map((key) => {
                        return taskList[key].map((elem, index) => {
                            return <React.Fragment>
                                {index === 0 ? <div className={`list_title` }>
                                    <h1
                                        className={color[key] !== undefined ? color[key] : console.log(color[key])}
                                        key={color[key]}
                                    >
                                        {key}
                                    </h1>
                                    <hr key={index} />
                                </div>: null}

                                <div className="todo_task">
                                    <ul>
                                        <li
                                            key={index}
                                            onClick={() => onClickLi(elem)}
                                            className={activeTask === elem ? 'completed_task': ''}
                                        >
                                            <div
                                                key={index}
                                                className={activeTask === elem ? 'active circle' : 'circle'}
                                            />
                                            {elem}
                                            {activeTask === elem ? <div className={'delete_task'}
                                                                        onClick={() => dispatch(deleteTask(activeTask, folder))}
                                            >&#x2717;</div> : null}

                                        </li>
                                    </ul>
                                </div>
                            </React.Fragment>
                        })})
                        : <React.Fragment >
                            <div className="list_title">
                <h1 className={color[activeItem] !== undefined ? color[activeItem] : ''}>{activeItem}</h1>
                <hr />
            </div>
            <div className="todo_task">
                <ul>
                    {taskList[activeItem] && taskList[activeItem].map((elem, index) => {
                        return <li
                            key={index}
                            onClick={() => onClickLi(elem)}
                            className={activeTask === elem ? 'completed_task': ''}
                        >
                            <div
                                className={activeTask === elem ? 'active circle' : 'circle'}
                                key={index}
                            />
                            {elem}
                            {activeTask === elem ? <div onClick={() => dispatch(deleteTask(activeTask, activeItem))} className={'delete_task'} >&#x2717;</div> : null}
                        </li>
                        })}

                </ul>
                </div>
                    {addTask ? <div
                            className='new_task'
                            onClick={() => addTaskHandler(!addTask)}
                        >
                            Новая задача
                        </div>
                        :
                        <div className='add_task'>
                            <input
                                type="text"
                                placeholder={'Текст задачи'}
                                onChange={event => eventInput(event)}
                                value={event}
                            />
                            <div className='button_elem'>
                                <button
                                    className='button green'
                                    onClick={() => dispatch(addTaskButton(event, activeItem, setEvent))}
                                >Добавить задачу</button>
                                <button
                                    className='button'
                                    onClick={() => addTaskHandler(!addTask)}
                                >Отмена</button>
                            </div>
                        </div>
                    }
                </React.Fragment>
            }


        </div>
    )
}