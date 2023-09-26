import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/Axios'


export const getCourses = createAsyncThunk('get_course',
    async () => {
        try {
            const request = await api.get('courses/course')
            const response = request.data
            if (request.status == 200) {
                return response
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

const initialState = {
    isLoading: true,
    data: [],
    msg: 'is still loading'
}


const CoursesSlice = createSlice({
    name: 'course_slice',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getCourses.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [getCourses.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.msg = "The state has been loaded"
        },
        [getCourses.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },
    }
})

export default CoursesSlice.reducer