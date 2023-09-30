import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/Axios'


export const UserMessages = createAsyncThunk('user_messages',
    async (room_id) => {
        try {
            const request = await api.get(`/community/messages/`)
            const response = request.data
            if (request.status === 200) {
                let data = await response.filter((item) => item.thread_name == room_id)
                return data
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


const initialState = {
    isLoading: true,
    messages: [],
    msg: 'Is in the intial State'
}

const ChatSlice = createSlice({
    name: 'chat_slice',
    initialState,
    reducers: {

    },
    extraReducers: {
        [UserMessages.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [UserMessages.fulfilled]: (state, action) => {
            state.isLoading = false
            state.messages = action.payload
            state.msg = "The state has been loaded"
        },
        [UserMessages.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },
    }
})

export default ChatSlice.reducer