import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface iTimeseries {
    base?: string,
    end_date?: string,
    start_date?: string,
    success?: true,
    timeseries?: true,
    rates?: {
        [key:string]: string
    }
}

export interface iDate{
    start_date: string,
    end_date: string,
    base: string,
    symbol: string
}

export const getCurrencyTimeseries = createAsyncThunk('timeseries/getCurrencyTimeseries', async (params: iDate, {rejectWithValue})=>{
    return await fetch(`${process.env.REACT_APP_BASE_URL}/exchangerates_data/timeseries?start_date=${params.start_date}&end_date=${params.end_date}&base=${params.base}&symbols=${params.symbol}`, {
        method: "GET",
        redirect: 'follow',
        headers: {
            apikey: `${process.env.REACT_APP_API_KEY}`
        }
    })
        .then(res=>res.json())
        .then(data=>{
            if (!data.error){
                return data as iTimeseries
            }else {
                return rejectWithValue(data.error.message)
            }
        })
})

const timeSeriesSlice = createSlice({
    name: "timeseries",
    initialState: {
        isLoading: false,
        timeseries: {},
        error: ""
    },
    reducers: {},
    extraReducers: {
        [getCurrencyTimeseries.pending.toString()]: (state, action: PayloadAction<Boolean>)=>{
            state.isLoading = true
        },
        [getCurrencyTimeseries.fulfilled.toString()]: (state, action: PayloadAction<iTimeseries>)=>{
            state.isLoading = false
            state.timeseries = action.payload
            state.error = ""
        },
        [getCurrencyTimeseries.rejected.toString()]: (state, action: PayloadAction<any>)=>{
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default timeSeriesSlice.reducer
