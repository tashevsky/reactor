const init = { count: 0 }

export const counterReducer = (state = init, action) => {
    // No Enums :(
    // const Action = {
    //   increment: 'increment',
    //   decrement: 'decrement',
    // }
    switch (action.type) {
        case 'increment':
            return { ...state, count: state.count + 1 }
        case 'decrement':
            return { ...state, count: state.count - 1 }
        default:
            return state
    }
}
