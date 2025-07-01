import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardLayout from './components/DashboardLayout';
import Feed from './components/Feed';
import ChatsPage from './components/ChatsPage';
import AllData from './components/AllData';
import UserProfile from './components/UserProfile';
import ReviewPage from './components/ReviewPage';
import LandingPage from './components/LandingPage';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const peopleNearYou = [
    { title: "John Doe", subtitle: "5km away", image: "/useravatar.png" },
    { title: "Jane Smith", subtitle: "2km away", image: "/useravatar.png" },
  ];

  const bookReviews = [
    { title: "The Secret Garden ", subtitle: "Frances Hodgson Burnett ", image: "/book1.png" },
    { title: "The Great Gatsby", subtitle: "F. Scott Fitzgerald", image: "/book1.png" },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <DashboardLayout collapsed={collapsed} setCollapsed={setCollapsed}>
                <Feed peopleNearYou={peopleNearYou} bookReviews={bookReviews} />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/home/people"
          element={
            <PrivateRoute>
              <DashboardLayout collapsed={collapsed} setCollapsed={setCollapsed}>
                <AllData Data={peopleNearYou} heading="People near you" />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/home/reviews"
          element={
            <PrivateRoute>
              <DashboardLayout collapsed={collapsed} setCollapsed={setCollapsed}>
                <AllData Data={bookReviews} heading="Book Reviews" />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/home/userprofile"
          element={
            <PrivateRoute>
              <DashboardLayout collapsed={collapsed} setCollapsed={setCollapsed}>
                <UserProfile />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/chats"
          element={
            <PrivateRoute>
              <DashboardLayout collapsed={collapsed} setCollapsed={setCollapsed}>
                <ChatsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/userreview"
          element={
            <PrivateRoute>
              <DashboardLayout collapsed={collapsed} setCollapsed={setCollapsed}>
                <ReviewPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
