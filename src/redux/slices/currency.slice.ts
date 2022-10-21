import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface iResult {
    success?: Boolean,
    timestamp?: string,
    date?: string,
    rates?: {
        [key:string]: string
    }
}

export const getCurrencyRate = createAsyncThunk('currency/getCurrencyRate', async (_,{rejectWithValue})=>{
    try {
        return await fetch(`${process.env.REACT_APP_BASE_URL}/exchangerates_data/latest`, {
            method: "GET",
            redirect: 'follow',
            headers: {
                apikey: `${process.env.REACT_APP_API_KEY}`
            }
        })
            .then(res=>res.json())
            .then(data=>{
                if (!data.error){
                    localStorage.setItem('currency', JSON.stringify(data))
                    return data as iResult
                }else {
                    return data.error.message
                }

            })
    }catch (err){
        return rejectWithValue(err)
    }
})

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        isLoading: false,
        result: {},
        error: ""
    },
    reducers: {},
    extraReducers: {
        [getCurrencyRate.pending.toString()]: (state)=>{
            state.isLoading = true
        },
        [getCurrencyRate.fulfilled.toString()]: (state, action: PayloadAction<iResult>)=>{
            state.isLoading = false
            state.result = action.payload
        },
        [getCurrencyRate.rejected.toString()]: (state, action: PayloadAction<string>)=>{
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default currencySlice.reducer
