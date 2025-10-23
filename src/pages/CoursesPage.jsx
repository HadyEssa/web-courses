import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { FiBookOpen, FiLoader } from 'react-icons/fi'; // Added FiLoader for loading state

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollectionRef = collection(db, 'courses');
        const querySnapshot = await getDocs(coursesCollectionRef);
        const coursesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesList);
      } catch (err) {
        console.error("Error fetching courses: ", err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FiLoader className="w-16 h-16 text-indigo-600 animate-spin" />
        <p className="ml-4 text-lg text-gray-700">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 bg-red-100 text-red-700 rounded-lg max-w-md mx-auto mt-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Explore Our Courses
        </h1>

        {courses.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600">No courses available yet.</p>
            <p className="mt-2 text-gray-500">Check back soon or create one if you're an admin!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {course.imageUrl && (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {course.description}
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 font-medium">
                    <FiBookOpen className="w-4 h-4 mr-2" />
                    <span>View Course</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
