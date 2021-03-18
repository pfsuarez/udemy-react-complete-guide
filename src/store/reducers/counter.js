import * as actionTypes from '../actions/actions';

const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            const newState = Object.assign({}, state); //clone object in inmutable way
            return {
                ...state, //spread operator
                counter: state.counter + 1
            };
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            };
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.val
            };
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.val
            };
    }
    return state;
};

export default reducer;