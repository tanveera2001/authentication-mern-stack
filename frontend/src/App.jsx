
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import SignUpPage from "./pages/auth/SignUpPage";
import EmailVerificationPage from "./pages/auth/EmailVerificationPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import useAuthStore from "./store/authStore";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isVerified } = useAuthStore();

  if(!isAuthenticated) return <Navigate to="/login" replace />;
  if(!isVerified) return <Navigate to="/verify-email" replace />;

  return children; 
};

const UnverifiedRoute = ({ children }) => {
  const { isAuthenticated, isVerified } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (isVerified) return <Navigate to="/" replace />;

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, isVerified } = useAuthStore();

  if (isAuthenticated && isVerified) return <Navigate to="/" replace />;

  return children;
};




const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/signup' element={ <RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser> } />
          <Route path='/verify-email' element={ <UnverifiedRoute><EmailVerificationPage /></UnverifiedRoute> } />
          <Route path='/login' element={ <RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser> } />
          <Route path='/forgot-password' element={ <RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser> } />
          <Route path='/reset-password/:token' element={ <RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser> } />
        </Route>

        <Route path="/" element={ <ProtectedRoute><DashboardPage /></ProtectedRoute> } />
      </Routes>

      
        
  
        
    </div>
  );
};

export default App;