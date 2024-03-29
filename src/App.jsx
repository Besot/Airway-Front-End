
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPasswordPage from './Pages/ForgotPasswordPage.jsx';
function App() {


  return (
      <>
        <Router>
          <Routes>
            <Route exact path="/forgot-password" element={<ForgotPasswordPage/>}/>
          </Routes>
        </Router>

      </>
  )
}

export default App;
