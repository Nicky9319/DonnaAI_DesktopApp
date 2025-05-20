import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './Views/MainPage/mainPage'
import AuthPage from './Views/AuthPage/authPage'



function App() {
  // Example function to determine which route to show
  const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    return false // or true
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated() ? <MainPage /> : <AuthPage />}
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  )
}

export default App
