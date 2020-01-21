import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
    GET_TASKS,
    ADD_TASK,
    DELETE_TASK,
    EDIT_TASK,
    DELETE_ALL_TASKS,
    TOGGLE_TASK_TYPE
} from '../actions/types';

const tokenConfig = getState => {
    const token = getState().userStates.token;
    const config = {
        headers: {
        'Content-type': 'application/json'
        }
    };
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
};

export const getTasks = () => (dispatch, getState) => {
    if (getState().userStates.token) {
        dispatch(showLoading())
        axios
        .get('/tasks', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TASKS,
                payload: res.data
            })
            dispatch(hideLoading());
        })
    } else {
        dispatch({
            type: GET_TASKS,
            payload: []
        })
    }
};

export const deleteTask = id => (dispatch, getState) => {
    dispatch(showLoading())
    axios
    .delete(`/tasks/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: DELETE_TASK,
            payload: id
        })
        dispatch(hideLoading());
    })
};

export const addTask = task => (dispatch, getState) => {
    dispatch(showLoading())
    axios
    .post('/tasks', task, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: ADD_TASK,
            payload: res.data
        })
        dispatch(hideLoading());
    })
}

export const editTask = (task, id) => (dispatch, getState) => {
    dispatch(showLoading())
    axios
    .put(`/tasks/${id}`, task, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: EDIT_TASK,
            payload: res.data
        })
        setTimeout(() => dispatch(hideLoading()), 500);
    })
}

export const deleteAllTasks = () => (dispatch, getState) => {
    dispatch(showLoading())
    axios
    .delete('/tasks', tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: DELETE_ALL_TASKS
        })
        dispatch(hideLoading());
    })

}

export const toggleTaskType = () => {
    return {
        type: TOGGLE_TASK_TYPE
    }
}
