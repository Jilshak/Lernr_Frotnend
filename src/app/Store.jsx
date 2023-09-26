import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../features/UserSlice'
import CourseSlice from '../features/CourseSlice'

export const store = configureStore({
    reducer: {
        users: UserSlice,
        courses: CourseSlice,
    }
})