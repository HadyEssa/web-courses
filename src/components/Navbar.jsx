import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext'; // Corrected path: from 'contexts' to 'context' and 'AuthContext' to 'Authcontext'
import { FiLogOut, FiLogIn, FiSettings, FiBookOpen } from 'react-icons/fi'; // <-- غيرنا الأيقونة

function Navbar() {
  // ... (logic is the same)
  const { currentuser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error("Failed to log out:", error); // Optional: Add error handling
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Home Link (now points to '/') */}
          <div className="shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800"
            >
              {/* <FiHome className="w-5 h-5" />  (غيرناها) */}
              <span className="font-bold text-xl">MyCourses</span>
            </Link>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-4">
            
            {/* --- NEW "My Courses" Link --- */}
            <Link
              to="/courses"
              className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <FiBookOpen className="w-4 h-4" />
              <span>My Courses</span>
            </Link>

            {/* Admin / Login Links (same logic) */}
            {currentuser ? (
              // --- If Logged In (Admin) ---
              <>
                <Link
                  to="/admin"
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <FiSettings className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              // --- If Logged Out (Guest) ---
              <Link
                to="/login"
                className="flex items-center space-x-1 bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                <FiLogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;