import {combineReducers} from "redux";
import currencySlice from "./slices/currency.slice";
import timeseriesSlice from "./slices/timeseries.slice";

export const rootReducer = combineReducers({
    currency: currencySlice,
    timeseries: timeseriesSlice
})

export type RootState = ReturnType<typeof rootReducer>

