import { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, Context } from "../Context/auth";
import { CreateMedications } from "../pages/CreateMedications";
import { Error } from "../pages/Error";
import { Login } from "../pages/Login";
import { Medications } from "../pages/Medications";

interface Props {
  children: React.ReactNode;
}

export const AppRoutes = () => {
  const Private = ({ children }) => {
    const { state } = useContext(Context);
    if (state.user.token == undefined) {
      return <Navigate to="/" />;
    } else if (state.user.token != "") {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/medications"
            element={
              <Private>
                <Medications />
              </Private>
            }
          />
          <Route
            path="/signupmedications"
            element={
              <Private>
                <CreateMedications />
              </Private>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
