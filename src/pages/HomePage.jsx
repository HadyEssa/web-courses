import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">
        Welcome to MyCourses!
      </h1>
      <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl">
        Your platform for learning and creating amazing courses.
      </p>
      <Link
        to="/courses"
        className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Explore Courses
      </Link>
      {/* You can add more content here, like featured courses, etc. */}
    </div>
  );
};

export default HomePage;
