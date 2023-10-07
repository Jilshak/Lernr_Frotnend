import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/Axios'
import Swal from 'sweetalert2'

export const addReview = createAsyncThunk('add_review', async (credentials) => {
    try {
        const credential = {
            review_by: credentials.review_by,
            review: credentials.review,
            course: credentials.course,
            stars: credentials.no_of_stars,
        }
        const request = await api.post(`courses/review/`, credential)
        if (request.status == 201) {
            const courseRequest = await api.get(`courses/course/${credentials.course}`)
            const courseData = courseRequest.data
            const newStars = courseData.no_of_stars + credentials.no_of_stars
            const NoOfReviews = courseData.no_of_reviews + 1
            const newRating = NoOfReviews !== 0 ? newStars / NoOfReviews : 0;
            console.log("This is the new rating: ", newRating)
            const req = await api.patch(`courses/course/${credentials.course}/`, { no_of_stars: newStars, no_of_reviews: NoOfReviews, rating: newRating })

            if (req.status == 200) {
                await Swal.fire({
                    background: '#fff',
                    icon: 'success',
                    title: 'Thank You!!',
                    text: 'The Review has been added!!',
                })
            }
        } else {
            await Swal.fire({
                background: '#fff',
                icon: 'error',
                title: 'Failed!!!!',
                text: 'Something went wrong while adding the review, please try again!!',
            })
        }
    } catch (error) {
        console.log("Error: ", error)
    }
})

export const getReview = createAsyncThunk('get_reviews',
    async (id) => {
        try {
            const request = await api.get(`courses/review/`);
            const response = request.data;

            if (request.status == 200){
               const data = await Promise.all(response.filter((item) => item.course == id)
               .map(async (item) => {
                const userDetails = await api.get(`user/${item.review_by}`)
                if (userDetails.status == 200){
                    const userData = userDetails.data
                    return {...item, user: userData}
                }
                return item
               }))
               console.log("This is the get reviw fucntion: ", data)
               return data

            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }
);

const initialState = {
    isLoading: true,
    data: [],
    msg: 'still on the intial state'
}

const ReviewSlice = createSlice({
    name: 'reveiw_slice',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getReview.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [getReview.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.msg = "The state has been loaded"
        },
        [getReview.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },
    }
})

export default ReviewSlice.reducer