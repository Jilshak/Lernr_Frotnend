import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/Axios'



export const makePayment = createAsyncThunk('make_payment',
    async (id) => {
        try {
            const request = await api.post(`payments/test/`, {course_id: id})
            const response = request.data
            if (request.status == 200) {
                console.log(response.session_id)
                return response.session_id
            } else {
                console.log("Something went wrong while doing the request")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)



const initialState = {
    isLoading: true,
    session_id: null,
    msg: 'still loading'
}

const PaymentSlice = createSlice({
    name: 'payment_slice',
    initialState,
    reducers: {

    },
    extraReducers: {
        [makePayment.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [makePayment.fulfilled]: (state, action) => {
            state.isLoading = false
            state.session_id = action.payload
            state.msg = "The state has been loaded"
        },
        [makePayment.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },
    }
})

export default PaymentSlice.reducer