import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/Axios'
import Swal from 'sweetalert2'
import jwtDecode from 'jwt-decode'

export const Register = createAsyncThunk('register',
    async (credentials) => {
        try {
            const request = await api.post(`user/`, credentials)
            if (request.status == 201) {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'success',
                        title: 'Account Created!',
                        text: "Your account has been created!!",
                    }
                )
            } else {
                await Swal.fire(
                    {
                        background: '#fff',
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

//profile image
export const profileImage = createAsyncThunk('profile_image',
    async (credentials) => {
        try {
            console.log("This is the credentials: ", credentials)
            console.log("This is from the userSlice: ", credentials.profile_image)
            const request = await api.patch(`/user/${credentials.id}/`, credentials.profile_image, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            const response = request.data
            if (request.status === 200) {
                console.log("The profile image has been updated")
                console.log("This is the response: ", response)
            } else {
                console.log("Something went wrong while patching the profile image")
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
            const response = request.data
            if (request.status === 200) {
                return response
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

export const getInstructors = createAsyncThunk('get_instructors',
    async () => {
        try {
            const request = await api.get(`user/`)
            const response = request.data
            if (request.status === 200) {
                const data = response.filter((item) => item.is_instructor)
                return data
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

export const getDesiredUser = createAsyncThunk('get_desired_user',
    async (id) => {
        try {
            const request = await api.get(`user/${id}/`)
            const response = request.data
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
            if (request.status === 200) {
                await localStorage.removeItem('guestToken')
                await localStorage.setItem('authToken', response.access)
                let token = await localStorage.getItem('authToken')
                let access = await jwtDecode(token)
                if (access.is_blocked) {
                    await localStorage.removeItem('authToken')
                    await Swal.fire(
                        {
                            background: '#fff',
                            icon: 'error',
                            title: 'Blocked!',
                            text: "You have been blocked by the Admin!!",
                        }
                    )
                } else {
                    await Swal.fire(
                        {
                            background: '#fff',
                            icon: 'success',
                            title: 'Login Successful!',
                            text: "Welcome!!",
                        }
                    )
                }
            }
        } catch (error) {
            await Swal.fire(
                {
                    background: '#fff',
                    icon: 'error',
                    title: 'Failed!!!!',
                    text: "A user with the given credential does not exist!!",
                }
            )
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
                        background: '#fff',
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
                        background: '#fff',
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
                        background: '#fff',
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

export const editProfile = createAsyncThunk('edit_profile', async (credentials) => {
    try {
        const filteredCredentials = Object.fromEntries(
            Object.entries(credentials).filter(([_, value]) => value !== null && value !== '')
        );
        const request = await api.patch(`user/${filteredCredentials.id}/`, filteredCredentials);
    } catch (error) {
        console.log("Error: ", error);
    }
});


export const updatePassword = createAsyncThunk('update_password',
    async (credentials) => {
        try {

            console.log(localStorage.getItem('authToken'))

            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            }
            const request = await api.patch(`change-password/`, credentials, { headers })
            if (request.status == 200) {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'success',
                        title: 'UPDATED!!',
                        text: "Your password has been Updated!!",
                    }
                )
            } else {
            }
        } catch (error) {
            console.log("Error: ", error)
            await Swal.fire(
                {
                    background: '#fff',
                    icon: 'error',
                    title: 'FAILED!!',
                    text: "Password updation failed are you sure you entered the right old password ?",
                }
            )
        }
    });


const initialState = {
    isLoading: true,
    data: [],
    user: [],
    profile: [],
    instructor: [],
    msg: 'is still loading'
}

const UserSlice = createSlice({
    name: 'user_slice',
    initialState,
    reducers: {
        blockUser: (state, action) => {
            const { userId } = action.payload;
            // Find the user by userId and update their block status in the state
            const userToBlock = state.data.find(user => user.id === userId);
            if (userToBlock) {
                userToBlock.is_blocked = true;
            }
        },
        unblockUser: (state, action) => {
            const { userId } = action.payload;
            // Find the user by userId and update their block status in the state
            const userToUnblock = state.data.find(user => user.id === userId);
            if (userToUnblock) {
                userToUnblock.is_blocked = false;
            }
        },
        blockInstructor: (state, action) => {
            const { userId } = action.payload;
            // Find the user by userId and update their block status in the state
            const userToBlock = state.instructor.find(user => user.id === userId);
            if (userToBlock) {
                userToBlock.is_blocked = true;
            }
        },
        unblockInstructor: (state, action) => {
            const { userId } = action.payload;
            // Find the user by userId and update their block status in the state
            const userToUnblock = state.instructor.find(user => user.id === userId);
            if (userToUnblock) {
                userToUnblock.is_blocked = false;
            }
        },
    },
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [getUsers.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.msg = "The state has been loaded"
        },
        [getUsers.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [getDesiredUser.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [getDesiredUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.msg = "The state has been loaded"
        },
        [getDesiredUser.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [getInstructors.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [getInstructors.fulfilled]: (state, action) => {
            state.isLoading = false
            state.instructor = action.payload
            state.msg = "The state has been loaded"
        },
        [getInstructors.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [getMyProfile.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [getMyProfile.fulfilled]: (state, action) => {
            state.isLoading = false
            state.profile = action.payload
            state.msg = "The state has been loaded"
        },
        [getMyProfile.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },
    }
})

export default UserSlice.reducer
export const { blockUser, unblockUser, blockInstructor, unblockInstructor } = UserSlice.actions
