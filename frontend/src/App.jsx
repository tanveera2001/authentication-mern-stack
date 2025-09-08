
import { useEffect } from "react";
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
	const { isAuthenticated, user } = useAuthStore();

	if(!isAuthenticated) return <Navigate to='/login' replace />;

	if (!user.isVerified) return <Navigate to='/verify-email' replace />;
	
	return children;
};


const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) return <Navigate to='/' replace />;
	return children;
};


const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <div className="text-center mt-20 text-white">Loading...</div>;

  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/verify-email"
            element={
                <EmailVerificationPage />
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        {/* catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
