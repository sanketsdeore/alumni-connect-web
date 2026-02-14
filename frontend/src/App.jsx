import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompleteProfile from "./pages/CompleteProfile";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AlumniNetwork from "./pages/AlumniNetwork";
import JobBoard from "./pages/JobBoard";
import DonationPage from "./pages/DonationPage";
import EventsPage from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Home />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/network"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <AlumniNetwork />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <JobBoard />
              </>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/donations" 
          element={
            <ProtectedRoute>
              <>
                <Navbar/>
                <DonationPage />
              </>
            </ProtectedRoute>
          } 
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <EventsPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <>
                <ProfilePage />
              </>
            </ProtectedRoute>
          }
        />



        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
