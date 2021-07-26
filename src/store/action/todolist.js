import {ACTIVEFOLDER, ADDCOLOR, ADDTASKACTION, ASYNCCOLOR, FOLDERNAME, LOADINGTODO} from "./actionTypes";
import axios from "../../axios/axios";
import axioss from "axios"


export const activeFolderHandler = (activeItem) => {
    return {
        type: ACTIVEFOLDER,
        activeItem
    }
}

export const addTaskButton = (value, activeItem, setEvent) => {
    return (dispatch, getState) => {
        const task = [...getState().list.taskList[activeItem]]
        task.push(value)
        console.log(task)
        dispatch(addTaskAction(task, activeItem))
        dispatch(asyncData(task, activeItem))
        setEvent('')
    }
}



export const asyncColorFolder = (colorState) => {
    return {
        type: ASYNCCOLOR,
        colorState
    }
}

export const loadingTodo = (todo) => {
    return {
        type: LOADINGTODO,
        todo
    }
}



export const deleteTask = (activeTask, activeItem) => {
    return (dispatch, getState) => {
        const task = [...getState().list.taskList[activeItem]]
        // task.splice()
        const index = task.indexOf(activeTask)
        task.splice(index, 1)
        console.log('новый таск ', task)

        dispatch(addTaskAction(task, activeItem))
        dispatch(asyncData(task, activeItem))
    }
}

export const addTaskAction = (task, activeItem) => {
    return {
        type: ADDTASKACTION,
        task,
        activeItem
    }
}

export const deleteFolder = (activeElem) => {
    return (dispatch, getState) => {
        const taskList = {...getState().list.taskList}
        delete taskList[activeElem]
        dispatch(addFolder(taskList))
        dispatch(asyncDeleteFolder(activeElem))
    }
}


export const loadingState = () => {
    return async (dispatch) => {
        console.log('Юрл аксиос ',axios.baseURL)
            const resp = await  axioss.get(`https://todoapp-fe6c9-default-rtdb.firebaseio.com/state/${localStorage.getItem('userId')}.json`)
            // console.log('Полученный стате ',resp.data[`color${localStorage.getItem('userId')}`])
            // if (localStorage.getItem('userId') == '2BsJniXdDkgbrGGC78sqwFpO9r92') {
            //     console.log('Test2, login')
            // } else {
            //     console.log('Test@mail,ru login')
            // }
            // Object.keys()resp.data
        console.log('Получаемый стате ', resp.data)
        // console.log(resp.data.localId)
        console.log('Userайди с стораге ',localStorage.getItem('userId'))
          resp.data &&  delete resp.data[`color${localStorage.getItem('userId')}`]
        console.log('дата после удаления', resp.data)
            dispatch(loadingTodo(resp.data))
            dispatch(loadingFolderColor())
        // } catch (e) {
        //     console.log(e)
        // }
    }
}
export const loadingFolderColor = () => {
    return async (dispatch) => {
        try {
            const resp = await axioss.get(`https://todoapp-fe6c9-default-rtdb.firebaseio.com/state/${localStorage.getItem('userId')}/color${localStorage.getItem('userId')}.json`)
            dispatch(asyncColorFolder(resp.data))
        } catch (e) {
            console.log(e)
        }
    }
}
// export const loadingData = () => {
//     return (dispatch)
// }
export const asyncData = (task, activeItem) => {
    return async () => {
        try {
            const resp = await axioss.patch(`https://todoapp-fe6c9-default-rtdb.firebaseio.com/state/${localStorage.getItem('userId')}.json`,{[activeItem]: task})
            console.log(resp.data)
        } catch (e) {
            console.log(e)
        }
    }
}

export const asyncDeleteFolder = (activeElem) => {
    return async () => {
        console.log(`/${activeElem}`)
        try {
            const resp = await axioss.delete(`https://todoapp-fe6c9-default-rtdb.firebaseio.com/state/${localStorage.getItem('userId')}/${activeElem}.json`)
        } catch (e) {
            console.log(e)
        }
    }
}
export const asyncFolder = (nameFolder) => {
    return async () => {
        try {
            const resp = await axioss.patch(`https://todoapp-fe6c9-default-rtdb.firebaseio.com/state/${localStorage.getItem('userId')}.json`, nameFolder)
        } catch (e) {
            console.log(e)
        }
    }
}
export const asyncColor = (colorState) => {
    return async () => {
        try {
            const resp = await axioss.patch(`https://todoapp-fe6c9-default-rtdb.firebaseio.com/state/${localStorage.getItem('userId')}/color${localStorage.getItem('userId')}.json`, {...colorState})
            console.log('Передоваемые цвета',resp.data)
        } catch (e) {
            console.log(e)
        }
    }
}
export const addFolderColor = (folderName, color, setEvents) => {
    return (dispatch, getState) => {
        const nameFolder = {...getState().list.taskList}
        nameFolder[folderName] = []
        dispatch(addFolder(nameFolder))
        dispatch(asyncFolder(nameFolder))
        console.log(nameFolder)
        const colorState = {...getState().list.activeColor}
        console.log('цвет папки', color)
        colorState[folderName] = color
        console.log(colorState)
        dispatch(addColor(colorState))
        dispatch(asyncColor(colorState))
        setEvents('')
    }
}

// export const setValue = (event) => {
//     return () => {
//         event.target.value = ''
//     }
// }

export const addFolder = (folderName) => {
    return {
        type: FOLDERNAME,
        folderName
    }
}

export const addColor = (color) => {
    return {
        type: ADDCOLOR,
        color
    }
}
// export const onSelectColor = (item) => {
//
// }