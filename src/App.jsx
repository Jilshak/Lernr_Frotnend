import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import SignupInstructorPage from './Pages/SignupInstructorPage'
import HomePage from './Pages/HomePage'
import CoursePage from './Pages/CoursePage'
import CartPage from './Pages/CartPage'
import ProfilePage from './Pages/ProfilePage'
import MyCourses from './Pages/MyCourses'
import EnrolledPage from './Pages/EnrolledPage'
import ProtectedRoutes from './utils/ProtectedRoutes'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminUsers from './Pages/Admin/AdminUsers'
import AdminReports from './Pages/Admin/AdminReports'
import AdminHome from './Pages/Admin/AdminHome'
import AdminInstructorPage from './Pages/Admin/AdminInstructorPage'
import AddCoursePage from './Pages/AddCoursePage'
import RootPage from './Pages/RootPage'
import AllCoursesPage from './Pages/AllCoursesPage'
import CategoryPage from './Pages/CategoryPage'
import CourseAnalytics from './Pages/CourseAnalytics'
import AddCategoryPage from './Pages/Admin/AddCategoryPage'
import CourseViewPage from './Pages/CourseViewPage'
import CommunityPage from './Pages/CommunityPage'
import ChatPage from './Pages/ChatPage'
import CheckoutForm from './Components/CheckoutForm'


function App() {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/signup_instructor' element={<SignupInstructorPage />} />

      <Route element={<ProtectedRoutes />}>
        <>
          <Route path='/' element={<RootPage />}>
            <Route index element={<HomePage />} />
            <Route path='coursepage/:id?' element={<CoursePage />} />
            <Route path='cart' element={<CartPage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='mycourses' element={<MyCourses />} />
            <Route path='enrolled' element={<EnrolledPage />} />
            <Route path='add_course' element={<AddCoursePage />} />
            <Route path='allCourse' element={<AllCoursesPage />} />
            <Route path='category/:id?' element={<CategoryPage />} />
            <Route path='course_analytics/:id?' element={<CourseAnalytics />} />
            <Route path='course_view/:id?' element={<CourseViewPage />} />
            <Route path='community' element={<CommunityPage />} />
            <Route path='stripe/:pi?/:id?' element={<CheckoutForm />} />
          </Route>
          <Route path='chat/:id?' element={<ChatPage />} />

          <Route path='/admin/' element={<AdminHome />}>
            <Route index element={<AdminDashboard />} />
            <Route path='admin_users' element={<AdminUsers />} />
            <Route path='admin_reports' element={<AdminReports />} />
            <Route path='admin_instructors' element={<AdminInstructorPage />} />
            <Route path='add_category' element={<AddCategoryPage />} />
          </Route>
        </>
      </Route>


    </Routes>
  )
}

export default App
