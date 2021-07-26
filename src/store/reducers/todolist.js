import {
    ACTIVEFOLDER,
    ADDCOLOR,
    ADDTASKACTION,
    ASYNCCOLOR,
    FOLDERNAME,
    LOADINGTODO,
    LOGSUCCESS, TESTLOGSUCCESS, TODO_LOGOUT
} from "../action/actionTypes";

const initialState = {
    // taskList: [
    //     'Изучить Frontend',
    //     'Изучить паттерны проектирования',
    //     'Изучить Redux',
    //     'Изучить React Hooks',
    //     'Ничего не учить'
    // ]
    taskList: {
        // "Покупки": [
        //     'Изучить Frontend',
        //     'Изучить паттерны проектирования',
        //     'Изучить Redux',
        //     'Изучить React Hooks',
        //     'Ничего не учить'
        // ],
        // "Фронтенд": [
        //     'Ничего не учить',
        //     'Скучное занятие',
        //     'Бросаю это все'
        // ],
    },
    activeItem: null,
    activeColor: {
        // 'Покупки': 'green',
        // 'Фронтенд': 'blue'
    },
    test: true
}



export default function listReducer (state = initialState, action) {
    switch (action.type) {
        case TODO_LOGOUT:
            return {
                ...state,
                taskList: {},
                activeItem: null,
                activeColor: {}
            }
        case LOADINGTODO:
            return {
                ...state,
                taskList: action.todo
            }
        case ASYNCCOLOR:
            return {
                ...state,
                activeColor: action.colorState
            }

        case ACTIVEFOLDER:
            return {
                ...state,
                activeItem: action.activeItem
            }
        case ADDTASKACTION: {
            return {
                ...state,
                taskList: {...state.taskList, [action.activeItem]: action.task }
            }
        // ...state.taskList[action.activeItem],
        }
        case ADDCOLOR :
            return {
                ...state,
                activeColor: action.color
            }
        case FOLDERNAME:
            return {
                ...state,
                taskList: action.folderName
            }
        case "TEST" : {
            return  {
                ...state
            }
        }
        case TESTLOGSUCCESS: {
            return {
                ...state,
                test: false
            }
        }

        default:
            return {
                ...state
            }
    }
}