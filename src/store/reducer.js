const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) => {
    debugger;
    if(action.type === 'INCREMENT') {
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    return state;
};

export default reducer;