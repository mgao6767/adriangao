export default (state, data) => {
    return {
        type: "UPDATE_STATE_" + state.toUpperCase(),
        payload: data
    }
} 