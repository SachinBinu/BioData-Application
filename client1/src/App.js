
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import BiodataForm from "./pages/BiodataForm";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import BiodataList from "./pages/BiodataList";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/biodata" element={<ProtectedRoute><BiodataForm/></ProtectedRoute>}/>
        <Route path="/biodata-list" element={<ProtectedRoute><BiodataList /></ProtectedRoute>}/>
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}
