import './index.css'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import HomePage from './components/HomePage'

function App() {

  return (
    <div>
       <Router>
         <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
         </Routes>
       </Router>
    </div>
  )
}

export default App
