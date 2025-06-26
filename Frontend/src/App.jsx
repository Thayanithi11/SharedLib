import './index.css'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useEffect, useState } from 'react'
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import DashboardLayout from './components/DashboardLayout'
import Feed from './components/Feed'
import ChatsPage from './components/ChatsPage'
import AllData from './components/AllData'

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [collapsed, setCollapsed] = useState(false);

   const peopleNearYou = [
    { title: "John Doe", subtitle: "5km away", image: "/useravatar.png" },
    { title: "Jane Smith", subtitle: "2km away", image: "/useravatar.png" },
   // more profiles...
  ];

   const bookReviews = [
    { title: "The Secret Garden ", subtitle: "Frances Hodgson Burnett ", image: "/book1.png" },
    { title: "The Great Gatsby", subtitle: "F. Scott Fitzgerald", image: "/book1.png" },
    // more books...
  ];

  return (
    <div>
       <Router>
      <Routes>
        <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes with persistent layout */}
        <Route
          path="/home"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <DashboardLayout
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setIsLoggedIn={setIsLoggedIn}
              >
                <Feed peopleNearYou={peopleNearYou} bookReviews={bookReviews}/>
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/home/people"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <DashboardLayout
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setIsLoggedIn={setIsLoggedIn}
              >
                <AllData Data={peopleNearYou}/>
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/home/reviews"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <DashboardLayout
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setIsLoggedIn={setIsLoggedIn}
              >
               <AllData Data={bookReviews}/>
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/chats"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <DashboardLayout
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setIsLoggedIn={setIsLoggedIn}
              >
                <ChatsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
    </div>
  )
}

export default App
