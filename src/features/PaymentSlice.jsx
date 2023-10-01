import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/Axios'


export const makePayment = createAsyncThunk('make_payment',
    async (credentials) => {
        try {
            const request = await api.post(`payments/test-payment/`, credentials)
            const response = request.data
            if (request.status == 200){
                console.log("This requst is a success")
            }else{
                console.log("Something went wrong while doing the request")
            }
        }catch(error){
            console.log("Error: ", error)
        }
    }
)



const initialState = {
    isLoading: true,
    data: [],
    msg: 'still loading'
}

const PaymentSlice = createSlice({
    name: 'payment_slice',
    initialState,
    reducers: {

    },
    extraReducers: {

    }
})

export default PaymentSlice.reducer