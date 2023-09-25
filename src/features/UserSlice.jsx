import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/Axios'
import Swal from 'sweetalert2'
import jwtDecode from 'jwt-decode'

export const Register = createAsyncThunk('register',
    async (credential) => {
        try {
            const request = await api.post(`user/`, credential)
            if (request.status == 201) {
                await Swal.fire(
                    {
                        background: '#191C24',
                        icon: 'success',
                        title: 'Account Created!',
                        text: "Your account has been created!!",
                    }
                )
                console.log("The user has been created")
            } else {
                await Swal.fire(
                    {
                        background: '#191C24',
                        icon: 'error',
                        title: 'Failed!!!!',
                        text: "Somthing happened while you were creating the account",
                    }
                )
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

export const getMyProfile = createAsyncThunk('my_profile',
    async (id) => {
        try {
            const request = await api.get(`user/${id}/`)
            const response = request.data
            if (request.status == 200) {
                return response
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

export const getUsers = createAsyncThunk('get_usres',
    async () => {
        try {
            const request = await api.get(`user/`)
            const response = request.data.length
            if (request.status === 200) {
                return response
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


export const getBlockedUsers = createAsyncThunk('get_blocked_user',
    async () => {
        try {
            const request = await api.get(`user/`)
            const response = request.data
            if (request.status == 200) {
                let data = response.filter((item) => item.is_blocked)
                return data
            }
        } catch (error) {
            console.log("Error for get blocked User: ", error)
        }
    }
)


export const Login = createAsyncThunk('login',
    async (credentials) => {
        try {
            const request = await api.post(`token/`, credentials)
            const response = request.data
            if (request.status == 200) {
                await localStorage.removeItem('guestToken')
                await localStorage.setItem('authToken', response.access)
                let token = await localStorage.getItem('authToken')
                let access = await jwtDecode(token)
                if (access.is_blocked) {
                    await localStorage.removeItem('authToken')
                    await Swal.fire(
                        {
                            background: '#191C24',
                            icon: 'error',
                            title: 'Blocked!',
                            text: "You have been blocked by the Admin!!",
                        }
                    )
                } else {
                    await Swal.fire(
                        {
                            background: '#191C24',
                            icon: 'success',
                            title: 'Login Successful!',
                            text: "Welcome!!",
                        }
                    )
                }
            } else {
                await Swal.fire(
                    {
                        background: '#191C24',
                        icon: 'error',
                        title: 'Failed!!!!',
                        text: "Somthing happened while you were logging in to the account",
                    }
                )
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

export const DeleteUser = createAsyncThunk('delete_user',
    async (id) => {
        try {
            const request = await api.delete(`user/${id}/`)
            if (request.status == 200) {
                await Swal.fire(
                    {
                        background: '#191C24',
                        icon: 'success',
                        title: 'Deleted!!',
                        text: "The User has been deleted Successfully!!",
                    }
                )
            }
        } catch (error) {
            console.log("Error while deleting: ", error)
        }
    }
)

export const BlockUser = createAsyncThunk('block_user',
    async (id) => {
        try {
            const request = await api.patch(`user/${id}/`, { is_blocked: true })
            if (request.status == 200) {
                await Swal.fire(
                    {
                        background: '#191C24',
                        icon: 'success',
                        title: 'Blocked!!',
                        text: "The User has been Blocked Successfully!!",
                    }
                )
            }
        } catch (error) {
            console.log("Error while blocking: ", error)
        }
    }
)

export const UnblockUser = createAsyncThunk('unblock_user',
    async (id) => {
        try {
            const request = await api.patch(`user/${id}/`, { is_blocked: false })
            if (request.status == 200) {
                await Swal.fire(
                    {
                        background: '#191C24',
                        icon: 'success',
                        title: 'UnBlocked!!',
                        text: "The User has been UnBlocked Successfully!!",
                    }
                )
            }
        } catch (error) {
            console.log("Error while blocking: ", error)
        }
    }
)


const initialState = {
    isLoading: true,
    data: [],
    msg: 'is still loading'
}

const UserSlice = createSlice({
    name: 'user_slice',
    initialState,
    reducers: {

    },
    extraReducers: {
        [Register.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [Register.fulfilled]: (state) => {
            state.isLoading = false
            state.msg = "The state has been loaded"
        },
        [Register.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },
    }
})

export default UserSlice.reducer
