import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/Axios'
import Swal from 'sweetalert2'


export const getCourses = createAsyncThunk('get_course',
    async () => {
        try {
            const courseRequest = await api.get('courses/course');
            const courseResponse = courseRequest.data;

            if (courseRequest.status === 200) {
                // Create an array of promises for fetching usernames
                const usernamePromises = courseResponse.map(async (course) => {
                    const userRequest = await api.get(`user/${course.course_by}`);
                    const userResponse = userRequest.data;
                    return {
                        ...course,
                        username: userResponse.username,
                    };
                });

                // Wait for all promises to resolve
                const coursesWithUsername = await Promise.all(usernamePromises);
                console.log("This is the updated course: ",coursesWithUsername)
                return coursesWithUsername;
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    });

export const getCategories = createAsyncThunk('get_categories',
    async () => {
        try {
            const request = await api.get('courses/category')
            const response = request.data
            if (request.status == 200) {
                return response
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


export const categoryCourse = createAsyncThunk('category_course',
    async (id) => {
        try {
            const request = await api.get('courses/course')
            const response = request.data
            if (request.status == 200) {
                const data = response.filter((item) => item.category == id)
                return data
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


export const myCourses = createAsyncThunk('my_courses',
    async (id) => {
        try {
            const request = await api.get('courses/course')
            const response = request.data
            if (request.status == 200) {
                const data = response.filter((item) => item.course_by == id)
                return data
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

//to add products to cart
export const addToCart = createAsyncThunk('add_to_cart',
    async (credentials) => {
        try {
            const request = await api.post('courses/cartItem/', credentials)
            if (request.status === 201) {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'success',
                        title: 'ADDED!',
                        text: "The Course has been added to Cart!!",
                    }
                )
            } else {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'error',
                        title: 'FAILED!',
                        text: "Something went wrong while adding the Course try again!!",
                    }
                )
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


export const getCartItems = createAsyncThunk('get_cart_items',
    async (id) => {
        try {
            const request = await api.get('courses/cartItem/');
            const response = request.data;
            if (request.status === 200) {

                const courseIds = response
                    .filter((item) => item.user === id)
                    .map((item) => item.on_course);

                console.log("This is the course ids: ", courseIds)

                const courseDetailsPromises = courseIds.map(async (courseId) => {
                    const courseResponse = await api.get(`courses/course/${courseId}`);
                    return courseResponse.data;
                });

                const courseDetails = await Promise.all(courseDetailsPromises);

                return courseDetails;
            }
        } catch (error) {
            console.log("Error: ", error);
            throw error;
        }
    }
);



export const removeCartItem = createAsyncThunk('remove_cart_item',
    async (credentials) => {
        try {
            const request = await api.get(`courses/cartItem/`)
            const response = request.data
            if (request.status == 200) {
                let data = response.filter((item) => item.user == credentials.user && item.on_course == credentials.on_course)
                console.log("This is the course that requires deletion: ", data)
                const req = api.delete(`courses/cartItem/${data[0].id}/`)
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)



export const individualCourse = createAsyncThunk('individual_course',
    async (id) => {
        try {
            const request = await api.get('courses/course')
            const response = request.data
            if (request.status == 200) {
                const data = response.filter((item) => item.id == id)
                return data
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


export const AddNewCourse = createAsyncThunk('add_new_course',
    async (credentials) => {
        console.log("This is the credentials from the instructor: ", credentials)
        try {
            const request = await api.post(`courses/course/`, credentials, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (request.status === 201) {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'success',
                        title: 'ADDED!',
                        text: "Your new Course has been added!!",
                    }
                )
            } else {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'error',
                        title: 'FAILED!',
                        text: "Something went wrong while adding your new Course please try again!!",
                    }
                )
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


const initialState = {
    isLoading: true,
    data: [],
    cart: [],
    category: [],
    mycourses: [],
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


        [getCategories.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [getCategories.fulfilled]: (state, action) => {
            state.isLoading = false
            state.category = action.payload
            state.msg = "The state has been loaded"
        },
        [getCategories.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [categoryCourse.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [categoryCourse.fulfilled]: (state, action) => {
            state.isLoading = false
            state.category = action.payload
            state.msg = "The state has been loaded"
        },
        [categoryCourse.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [myCourses.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [myCourses.fulfilled]: (state, action) => {
            state.isLoading = false
            state.mycourses = action.payload
            state.msg = "The state has been loaded"
        },
        [myCourses.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [individualCourse.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [individualCourse.fulfilled]: (state, action) => {
            state.isLoading = false
            state.mycourses = action.payload
            state.msg = "The state has been loaded"
        },
        [individualCourse.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [getCartItems.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cart = action.payload
            state.msg = "The state has been loaded"
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },
    }
})

export default CoursesSlice.reducer