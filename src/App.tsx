import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./components/AppRoutes";
import { CreateMedications } from "./pages/CreateMedications";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
import { Medications } from "./pages/Medications";

function App() {
  return <AppRoutes />;
}

export default App;
