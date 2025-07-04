import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  if (currentUser === null) {
    // not logged in
    return <Navigate to="/login" />;
  }

  return children;
}
