import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import SignupInstructorPage from './Pages/SignupInstructorPage'
import HomePage from './Pages/HomePage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/signup_instructor' element={<SignupInstructorPage />} />
    </Routes>
  )
}

export default App
