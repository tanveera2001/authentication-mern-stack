
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import SignUpPage from "./pages/auth/SignUpPage";
import EmailVerificationPage from "./pages/auth/EmailVerificationPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";



const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/signup' element={ <SignUpPage /> } />
          <Route path='/verify-email' element={ <EmailVerificationPage /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/forgot-password' element={ <ForgotPasswordPage /> } />
          <Route path='/reset-password/:token' element={ <ResetPasswordPage /> } />
        </Route>
      </Routes>
    </div>
  );
};

export default App;