import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/Axios'

export const NoOfUsers = createAsyncThunk('no_of_users',
  async () => {
    try {
      const request = await api.get('user');
      const response = request.data;

      if (request.status === 200) {
        console.log(response);

        const currentYear = new Date().getFullYear();
        const yearlyCounts = new Array(5).fill(0);
        const monthlyCounts = new Array(12).fill(0);

        response.forEach((user) => {
          const dateJoined = new Date(user.date_joined);
          const yearDifference = currentYear - dateJoined.getFullYear();
          const month = dateJoined.getMonth();

          if (yearDifference >= 0 && yearDifference < 5) {
            yearlyCounts[yearDifference]++;
          }

          monthlyCounts[month]++;
        });

        return { yearlyCounts, monthlyCounts };
      }
    } catch (error) {
      console.error(error);
    }
  }
);


export const NoOfInstructors = createAsyncThunk('no_of_instructors',
  async () => {
    try {
      const request = await api.get('user');
      const response = request.data.filter((item) => item.is_instructor);

      if (request.status === 200) {
        console.log(response);

        const currentYear = new Date().getFullYear();
        const yearlyCounts = new Array(5).fill(0);
        const monthlyCounts = new Array(12).fill(0);

        response.forEach((user) => {
          const dateJoined = new Date(user.date_joined);
          const yearDifference = currentYear - dateJoined.getFullYear();
          const month = dateJoined.getMonth();

          if (yearDifference >= 0 && yearDifference < 5) {
            yearlyCounts[yearDifference]++;
          }

          monthlyCounts[month]++;
        });

        return { yearlyCounts, monthlyCounts };
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const NoOfCourses = createAsyncThunk('no_of_courses',
  async () => {
    try {
      const request = await api.get('courses/course/');
      const response = request.data;

      if (request.status === 200) {
        console.log(response);

        const currentYear = new Date().getFullYear();
        const yearlyCounts = new Array(5).fill(0);
        const monthlyCounts = new Array(12).fill(0);

        response.forEach((course) => {
          const createdAt = new Date(course.created_at);
          const yearDifference = currentYear - createdAt.getFullYear();
          const month = createdAt.getMonth();

          if (yearDifference >= 0 && yearDifference < 5) {
            yearlyCounts[yearDifference]++;
          }

          monthlyCounts[month]++;
        });

        return { yearlyCounts, monthlyCounts };
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const NoOfSales = createAsyncThunk('no_of_sales',
  async () => {
    try {
      const request = await api.get('courses/bought_courses');
      const response = request.data;

      if (request.status === 200) {
        console.log(response);

        const currentYear = new Date().getFullYear();
        const yearlyCounts = new Array(5).fill(0);
        const monthlyCounts = new Array(12).fill(0);

        response.forEach((sale) => {
          const createdAt = new Date(sale.created_at);
          const yearDifference = currentYear - createdAt.getFullYear();
          const month = createdAt.getMonth();

          if (yearDifference >= 0 && yearDifference < 5) {
            yearlyCounts[yearDifference]++;
          }

          monthlyCounts[month]++;
        });

        return { yearlyCounts, monthlyCounts };
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const Profit = createAsyncThunk('profit',
  async () => {
    try {
      const request = await api.get('courses/bought_courses/');
      const boughtCourses = request.data;

      if (request.status === 200) {
        const currentYear = new Date().getFullYear();
        const monthlyProfits = new Array(12).fill(0);
        const yearlyProfits = new Array(5).fill(0);

        for (const boughtCourse of boughtCourses) {
          const courseId = boughtCourse.course_id;

          const courseRequest = await api.get(`courses/course/${courseId}`);
          const course = courseRequest.data;

          if (courseRequest.status === 200) {
            const coursePrice = course.price;
            const profit = (coursePrice * 0.1);
            const createdAt = new Date(course.created_at);
            const yearDifference = currentYear - createdAt.getFullYear();
            const month = createdAt.getMonth();

            if (yearDifference >= 0 && yearDifference < 5) {
              yearlyProfits[yearDifference] += profit;
            }

            monthlyProfits[month] += profit;
          }
        }

        return { yearlyProfits, monthlyProfits };
      }
    } catch (error) {
      console.error(error);
    }
  }
);

//cousre Analytics
export const courseAnalyticsStudents = createAsyncThunk(
  'course_analytics_students',
  async (id) => {
    try {
      const request = await api.get('courses/bought_courses');
      const response = request.data;

      if (request.status === 200) {
        const courseStudents = response.filter((item) => item.course_id == id);
        console.log("This is the course students: ", courseStudents)
        const monthlyCounts = new Array(12).fill(0);
        const yearlyCounts = new Array(5).fill(0);

        const currentYear = new Date().getFullYear();

        courseStudents.forEach((student) => {
          const dateBought = new Date(student.created_at);
          console.log("This is the date bought: ", dateBought)
          const month = dateBought.getMonth();
          const year = dateBought.getFullYear();

          const yearlyIndex = currentYear - year;

          monthlyCounts[month]++;
          if (yearlyIndex >= 0 && yearlyIndex < 5) {
            yearlyCounts[yearlyIndex]++;
          }
        });

        return { monthlyCounts, yearlyCounts };
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);


export const courseAnalyticsReviews = createAsyncThunk(
  'course_analytics_reviews',
  async (id) => {
    try {
      const request = await api.get('courses/review/');
      const response = request.data;

      if (request.status === 200) {
        const courseReviews = response.filter((item) => item.course == id); 
        const monthlyCounts = new Array(12).fill(0);
        const yearlyCounts = new Array(5).fill(0);

        const currentYear = new Date().getFullYear();

        courseReviews.forEach((review) => {
          const datePosted = new Date(review.created_at);
          const month = datePosted.getMonth();
          const year = datePosted.getFullYear();

          const yearlyIndex = currentYear - year;

          monthlyCounts[month]++;
          if (yearlyIndex >= 0 && yearlyIndex < 5) {
            yearlyCounts[yearlyIndex]++;
          }
        });

        return { monthlyCounts, yearlyCounts };
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);


export const courseAnalyticsProfit = createAsyncThunk(
  'course_analytics_profit',
  async (id) => {
    try {
      const boughtCoursesRequest = await api.get('courses/bought_courses');
      const boughtCoursesResponse = boughtCoursesRequest.data;

      if (boughtCoursesRequest.status === 200) {
        const courseOccurrences = boughtCoursesResponse.filter((item) => item.course_id == id);

        const courseRequest = await api.get(`courses/course/${id}`);
        const courseResponse = courseRequest.data;

        if (courseRequest.status === 200) {
          const coursePrice = courseResponse.price;

          let totalProfit = 0;

          const monthlyProfit = new Array(12).fill(0);
          const yearlyProfit = new Array(5).fill(0);

          const currentYear = new Date().getFullYear();

          courseOccurrences.forEach((occurrence) => {
            const profitFromOccurrence = coursePrice * 0.9;
            totalProfit += profitFromOccurrence;

            const dateBought = new Date(occurrence.created_at);
            const month = dateBought.getMonth();
            const year = dateBought.getFullYear();

            const yearlyIndex = currentYear - year;

            monthlyProfit[month] += profitFromOccurrence; // Add profit to the corresponding month
            if (yearlyIndex >= 0 && yearlyIndex < 5) {
              yearlyProfit[yearlyIndex] += profitFromOccurrence; // Add profit to the corresponding year
            }
          });

          return { totalProfit, monthlyProfit, yearlyProfit };
        }
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export const courseAnalyticsRating = createAsyncThunk('course_analytics_reveiw',
  async (id) => {
    try{
      const request = await api.get(`courses/course/${id}`)
      const response = request.data
      if (request.status == 200){
        return response.rating
      }
    }catch(error){
      console.log("Error: ", error)
    }
  }
)





const initialState = {
  isLoading: true,
  data: [],
  course: [],
  sales: [],
  profit: [],
  instructors: [],
  ca_students : [],
  ca_review: [],
  rating: [],
  ca_profit: [],
  msg: 'still loading '
}

const ChartSlice = createSlice({
  name: 'chart_slice',
  initialState,
  reducers: {

  },
  extraReducers: {

    [NoOfUsers.pending]: (state) => {
      state.isLoading = true
      state.msg = "The state is still loading!!"
    },
    [NoOfUsers.fulfilled]: (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.msg = "The state has been loaded"
    },
    [NoOfUsers.rejected]: (state) => {
      state.isLoading = false
      state.msg = 'The loading of the state has been finished with some problem.'
    },

    [NoOfInstructors.pending]: (state) => {
      state.isLoading = true
      state.msg = "The state is still loading!!"
    },
    [NoOfInstructors.fulfilled]: (state, action) => {
      state.isLoading = false
      state.instructors = action.payload
      state.msg = "The state has been loaded"
    },
    [NoOfInstructors.rejected]: (state) => {
      state.isLoading = false
      state.msg = 'The loading of the state has been finished with some problem.'
    },

    [NoOfCourses.pending]: (state) => {
      state.isLoading = true
      state.msg = "The state is still loading!!"
    },
    [NoOfCourses.fulfilled]: (state, action) => {
      state.isLoading = false
      state.course = action.payload
      state.msg = "The state has been loaded"
    },
    [NoOfCourses.rejected]: (state) => {
      state.isLoading = false
      state.msg = 'The loading of the state has been finished with some problem.'
    },


    [NoOfSales.pending]: (state) => {
      state.isLoading = true
      state.msg = "The state is still loading!!"
    },
    [NoOfSales.fulfilled]: (state, action) => {
      state.isLoading = false
      state.sales = action.payload
      state.msg = "The state has been loaded"
    },
    [NoOfSales.rejected]: (state) => {
      state.isLoading = false
      state.msg = 'The loading of the state has been finished with some problem.'
    },


    [Profit.pending]: (state) => {
      state.isLoading = true
      state.msg = "The state is still loading!!"
    },
    [Profit.fulfilled]: (state, action) => {
      state.isLoading = false
      state.profit = action.payload
      state.msg = "The state has been loaded"
    },
    [Profit.rejected]: (state) => {
      state.isLoading = false
      state.msg = 'The loading of the state has been finished with some problem.'
    },


    [courseAnalyticsStudents.pending]: (state) => {
      state.isLoading = true
      state.msg = "The state is still loading!!"
    },
    [courseAnalyticsStudents.fulfilled]: (state, action) => {
      state.isLoading = false
      state.ca_students = action.payload
      state.msg = "The state has been loaded"
    },
    [courseAnalyticsStudents.rejected]: (state) => {
      state.isLoading = false
      state.msg = 'The loading of the state has been finished with some problem.'
    },


    [courseAnalyticsReviews.pending]: (state) => {
      state.isLoading = true
      state.msg = "The state is still loading!!"
    },
    [courseAnalyticsReviews.fulfilled]: (state, action) => {
      state.isLoading = false
      state.ca_review = action.payload
      state.msg = "The state has been loaded"
    },
    [courseAnalyticsReviews.rejected]: (state) => {
      state.isLoading = false
      state.msg = 'The loading of the state has been finished with some problem.'
    },


    [courseAnalyticsProfit.pending]: (state) => {
      state.isLoading = true
      state.msg = "The state is still loading!!"
    },
    [courseAnalyticsProfit.fulfilled]: (state, action) => {
      state.isLoading = false
      state.ca_profit = action.payload
      state.msg = "The state has been loaded"
    },
    [courseAnalyticsProfit.rejected]: (state) => {
      state.isLoading = false
      state.msg = 'The loading of the state has been finished with some problem.'
    },


    [courseAnalyticsRating.pending]: (state) => {
      state.isLoading = true
      state.msg = "The state is still loading!!"
    },
    [courseAnalyticsRating.fulfilled]: (state, action) => {
      state.isLoading = false
      state.rating = action.payload
      state.msg = "The state has been loaded"
    },
    [courseAnalyticsRating.rejected]: (state) => {
      state.isLoading = false
      state.msg = 'The loading of the state has been finished with some problem.'
    },
  }
})

export default ChartSlice.reducer