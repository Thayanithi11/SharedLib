import './index.css'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
       <Router>
         <Routes>
            <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/home" element={isLoggedIn&&<div>
                                  <SideBar setCollapsed={setCollapsed} collapsed={collapsed} setIsLoggedIn={setIsLoggedIn}/>
                                  <TopBar collapsed={collapsed}/>
                              </div>}/>
         </Routes>
       </Router>
    </div>
  )
}

export default App
