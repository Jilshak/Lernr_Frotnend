import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import SignupInstructorPage from './Pages/SignupInstructorPage'
import HomePage from './Pages/HomePage'
import CoursePage from './Pages/CoursePage'
import CartPage from './Pages/CartPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/signup_instructor' element={<SignupInstructorPage />} />
      <Route path='/coursepage' element={<CoursePage />} />
      <Route path='/cart' element={<CartPage />} />
    </Routes>
  )
}

export default App
