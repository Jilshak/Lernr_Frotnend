import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/Axios'
import Swal from 'sweetalert2'


export const getCourses = createAsyncThunk('get_course',
    async (id) => {
        try {
            const courseRequest = await api.get('courses/course');
            const courseResponse = courseRequest.data;

            const final = courseResponse.filter((item) => item.course_by != id)

            if (courseRequest.status === 200) {
                // Create an array of promises for fetching usernames
                const usernamePromises = final.map(async (course) => {
                    const userRequest = await api.get(`user/${course.course_by}`);
                    const userResponse = userRequest.data;
                    return {
                        ...course,
                        username: userResponse.username,
                    };
                });

                // Wait for all promises to resolve
                const coursesWithUsername = await Promise.all(usernamePromises);
                console.log("This is the updated course: ", coursesWithUsername)
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

//add Category
export const AddCategory = createAsyncThunk('add_category',
    async (credentials) => {
        try {
            const request = await api.post(`courses/category/`, credentials, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            const response = request.data
            if (request.status == 201) {
                console.log("This is the new added course: ", response)
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'success',
                        title: 'ADDED!',
                        text: "The Category has been added!!",
                    }
                )
            } else {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'error',
                        title: 'FAILED!',
                        text: "Something went wrong while adding the Category please try again!!",
                    }
                )
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

export const getCategoryName = createAsyncThunk('category_name',
    async (id) => {
        try {
            const request = await api.get(`courses/category/${id}`)
            const response = request.data
            if (request.status == 200) {
                return response.title
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

export const categoryCourse = createAsyncThunk('category_course',
    async (credentials) => {
        try {
            const request = await api.get('courses/course')
            const response = request.data
            if (request.status == 200) {
                const data = response.filter((item) => item.category == credentials.id && item.course_by != credentials.user)
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
            const req = await api.get('courses/cartItem')
            const res = req.data
            if (req.status == 200) {
                const final = res.filter((item) => item.user == credentials.user && item.on_course == credentials.on_course)
                if (!final.length >= 1) {
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
                } else {
                    await Swal.fire(
                        {
                            background: '#fff',
                            icon: 'error',
                            title: 'FAILED!',
                            text: "You Already have the same course in your cart!!",
                        }
                    )
                }

            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

//for getting the cartItems
export const getCartItems = createAsyncThunk('get_cart_items',
    async (id) => {
        try {
            const request = await api.get('courses/cartItem/');
            const response = request.data;
            if (request.status === 200) {

                const courseIds = response
                    .filter((item) => item.user === id)
                    .map((item) => item.on_course);

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


//removing the cart items
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


//for getting individual course details
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

//for adding an new course
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


//for buying an course
export const buyCourse = createAsyncThunk('buy_course',
    async (credentials) => {
        console.log("This is the credentials: ", credentials)
        try {
            const request = await api.post(`courses/bought_courses/`, credentials)
            const response = request.data
            if (request.status == 201) {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'success',
                        title: 'CONGRATS!',
                        text: "Your Purchase is Successful !!",
                    }
                )
                const req = await api.get(`courses/course/${parseInt(credentials.course_id)}`)
                const res = req.data
                if (req.status == 200) {
                    console.log(res)
                    const update = api.patch(`courses/course/${parseInt(credentials.course_id)}/`, { students: res.students + 1 })
                }
            } else {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'error',
                        title: 'OOPS....',
                        text: "Something went wrong while trying to buy this please try again!!",
                    }
                )
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

export const getBoughtCourses = createAsyncThunk('get_bought_course', async (_id) => {
    try {
        const request = await api.get(`courses/bought_courses`);
        const response = request.data;

        if (request.status === 200) {
            const filteredData = response.filter((item) => item.user === _id);

            const courseDetailsWithProgress = await Promise.all(
                filteredData.map(async (item) => {
                    const courseResponse = await api.get(`courses/course/${item.course_id}`);
                    return {
                        ...courseResponse.data,
                        progress: item.progress, // Include progress in course details
                    };
                })
            );

            console.log("Bought Courses with Progress and Details: ", courseDetailsWithProgress);
            return courseDetailsWithProgress;
        }
    } catch (error) {
        console.log("Error: ", error);
    }
});


//for the navbar--> i.e; if anyone has bought any course the community navitem to appear
export const hasBoughtAnyCourse = createAsyncThunk('has_bought_any_course',
    async (id) => {
        try {
            const request = await api.get(`courses/bought_courses`)
            const response = request.data
            if (request.status == 200) {
                let data = response.filter((item) => item.user == id)
                if (data.length >= 1) {
                    return true
                } else {
                    return false
                }
            }
        } catch (error) {
            console.log("Errror: ", error)
        }
    }
)

//if course already bought then shouldn't be able to add that course again for that user
export const alreadyBoughtCourse = createAsyncThunk('already_bought_course',
    async (credentials) => {
        try {
            console.log("This is the credentials: ", credentials)
            const request = await api.get(`courses/bought_courses`)
            const response = request.data
            if (request.status == 200) {
                console.log("This is the bought courses: ", response)
                const data = response.filter((item) => item.user == credentials.user && item.course_id == credentials.course_id)
                console.log("This is the data that is coming from this: ", data)
                if (data.length == 0) {
                    return false
                } else {
                    return true
                }
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

export const updateProgress = createAsyncThunk('update_progress',
    async (credentials) => {
        try {
            const request = await api.get(`courses/bought_courses`)
            const resposne = request.data
            if (request.status == 200) {
                const data = resposne.filter((item) => item.user == credentials.user && item.course_id == credentials.course_id)
                console.log("This is the desired bought course!!!", data)
                const boughtCourseId = data[0].id
                console.log("This is the credentials: ", credentials)
                console.log("This is the data: ", data[0])
                if (data[0].progress < credentials.progress) {
                    const req = await api.patch(`courses/bought_courses/${boughtCourseId}/`, { progress: credentials.progress })
                    const res = req.data
                    if (req.status == 200) {
                        console.log("The bought course progress has been updated")
                    }
                }
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

const initialState = {
    isLoading: true,
    community: false,
    alreadybought: false,
    toggle: false,
    cart_count: 0,
    data: [],
    cart: [],
    category: [],
    categoryCourse: [],
    categoryTitle: [],
    bought: [],
    mycourses: [],
    msg: 'is still loading'
}


const CoursesSlice = createSlice({
    name: 'course_slice',
    initialState,
    reducers: {
        toggleButton(state, action) {
            state.toggle = true
            console.log('this is the toggleButton: ', state.toggle)
        },
        closeButton(state, action) {
            state.toggle = false
            console.log('this is the closeButton: ', state.toggle)
        },
        addtoCart(state, action) {
            state.cart.push(action.payload);
            state.cart_count += 1;
        },
        removefromCart(state, action) {
            console.log("This is being called here: ", action.payload)
            const productIdToRemove = action.payload;
            state.cart = state.cart.filter((product) => product.id !== productIdToRemove);
            state.cart_count -= 1;
        },
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
            state.categoryCourse = action.payload
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


        [getBoughtCourses.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [getBoughtCourses.fulfilled]: (state, action) => {
            state.isLoading = false
            state.bought = action.payload
            state.msg = "The state has been loaded"
        },
        [getBoughtCourses.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [hasBoughtAnyCourse.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [hasBoughtAnyCourse.fulfilled]: (state, action) => {
            state.isLoading = false
            state.community = action.payload
            state.msg = "The state has been loaded"
        },
        [hasBoughtAnyCourse.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [alreadyBoughtCourse.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [alreadyBoughtCourse.fulfilled]: (state, action) => {
            state.isLoading = false
            state.alreadybought = action.payload
            state.msg = "The state has been loaded"
        },
        [alreadyBoughtCourse.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [getCategoryName.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [getCategoryName.fulfilled]: (state, action) => {
            state.isLoading = false
            state.categoryTitle = action.payload
            state.msg = "The state has been loaded"
        },
        [getCategoryName.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },
    }
})

export const { toggleButton, closeButton, addtoCart, removefromCart } = CoursesSlice.actions
export default CoursesSlice.reducer