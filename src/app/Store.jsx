import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../features/UserSlice'
import CourseSlice from '../features/CourseSlice'
import ChatSlice from '../features/ChatSlice'
import PaymentSlice from '../features/PaymentSlice'

export const store = configureStore({
    reducer: {
        courses: CourseSlice,
        users: UserSlice,
        chat: ChatSlice,
        payment: PaymentSlice,
    }
})