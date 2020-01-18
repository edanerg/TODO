import {
    GET_TASKS,
    ADD_TASK,
    DELETE_TASK,
    DELETE_ALL_TASKS,
    EDIT_TASK,
    TOGGLE_TASK_TYPE
} from '../actions/types';

const initialState = {
    tasks: [],
    taskType: 'onGoing'
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                taskType: 'onGoing'
            };
        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task)
            };
        case DELETE_ALL_TASKS:
            return {
                ...state,
                tasks: []
            };
        case TOGGLE_TASK_TYPE:
            return {
                ...state,
                taskType: state.taskType === 'onGoing' ? 'completed' : 'onGoing'
            };
        default:
            return state;
    }
}