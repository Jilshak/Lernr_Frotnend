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

function App() {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/signup_instructor' element={<SignupInstructorPage />} />

      <Route element={<ProtectedRoutes />}>
        <>
          <Route path='/' element={<HomePage />} />
          <Route path='/coursepage' element={<CoursePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/mycourses' element={<MyCourses />} />
          <Route path='/enrolled' element={<EnrolledPage />} />
        </>
      </Route>

      
    </Routes>
  )
}

export default App
