import { combineReducers } from "redux";

const reducerMaker = (name, initialState) => {
    return (state = initialState, action) => {
        switch (action.type) {
            case "UPDATE_STATE_" + name.toUpperCase():
                return action.payload;
            default:
                return state;
        }
    }
}

export const allReducers = combineReducers({
    spotPrice: reducerMaker('spotPrice', 50),
    strikePrice: reducerMaker('strikePrice', 50),
    interestRate: reducerMaker('interestRate', 10),
    compoundingFreq: reducerMaker('compoundingFreq', 'continuously'),
    volatility: reducerMaker('volatility', 20),
    timeToMaturity: reducerMaker('timeToMaturity', 1.5),
    timeToMaturityFreq: reducerMaker('timeToMaturityFreq', 'months'),
    optionType: reducerMaker('optionType', 'call'),
    optionValue: reducerMaker('optionValue', null)
})