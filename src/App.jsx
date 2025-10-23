import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AdminPanel from "./pages/AdminPanel"
import LoginPage from "./pages/LoginPage"
import CourseDetailPage from "./pages/CourseDetailPage" // Import CourseDetailPage
import CoursesPage from "./pages/CoursesPage" // Import CoursesPage
import ProtectedRoute from "./components/ProtectedRoute" // Import ProtectedRoute

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />{" "}
        <Route path="/homepage" element={<HomePage />} />{" "}
        <Route path="/courses" element={<CoursesPage />} />{" "}
        <Route path="/course/:courseId" element={<CourseDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
