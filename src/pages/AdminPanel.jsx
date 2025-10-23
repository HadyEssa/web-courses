// src/pages/AdminPanel.jsx
import  { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useAuth } from "../context/Authcontext"; 
import { FiFolderPlus, FiFilm } from "react-icons/fi"; 

const AdminPanel=()=> {

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImageUrl, setCourseImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const [courses, setCourses] = useState([]); 
  const [selectedCourseId, setSelectedCourseId] = useState(""); 
  const [episodeTitle, setEpisodeTitle] = useState(""); 
  const [episodeVideoUrl, setEpisodeVideoUrl] = useState(""); 
  const [episodeLoading, setEpisodeLoading] = useState(false);
  const [episodeMessage, setEpisodeMessage] = useState("");

  const { currentuser } = useAuth(); 

  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollectionRef = collection(db, "courses");
        const querySnapshot = await getDocs(coursesCollectionRef);
        const coursesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesList);
        if (coursesList.length > 0) {
          setSelectedCourseId(coursesList[0].id); 
        }
      } catch (err) {
        console.error("Error fetching courses: ", err);
        setMessage("Error: Could not fetch courses list.");
      }
    };
    fetchCourses();
  }, []); 


  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (!currentuser) {
      setMessage("Error: You must be logged in to create a course.");
      setLoading(false);
      return;
    }
    const courseData = {
      title: courseTitle,
      description: courseDescription,
      imageUrl: courseImageUrl,
      createdAt: new Date(),
      userId: currentuser.uid, 
    };

    try {
      const coursesCollectionRef = collection(db, "courses");
      const docRef = await addDoc(coursesCollectionRef, courseData);

      const newCourse = { id: docRef.id, ...courseData };
      setCourses([...courses, newCourse]);
      setSelectedCourseId(docRef.id); 

      setLoading(false);
      setMessage("Course created successfully!");
      setCourseTitle("");
      setCourseDescription("");
      setCourseImageUrl("");
    } catch (err) {
      setLoading(false);
      setMessage(" Error in adding course: " + err.message);
      console.error("Error adding document: ", err);
    }
  };

  
  const handleAddEpisode = async (e) => {
    e.preventDefault();
    if (!selectedCourseId) {
      setEpisodeMessage("Error: Please select a course first.");
      return;
    }
    setEpisodeLoading(true);
    setEpisodeMessage("");

    const episodeData = {
      title: episodeTitle,
      videoUrl: episodeVideoUrl,
      createdAt: new Date(),
    };

    try {
    
      const episodeCollectionRef = collection(
        db,
        "courses",
        selectedCourseId,
        "episodes"
      );
      await addDoc(episodeCollectionRef, episodeData);

      setEpisodeLoading(false);
      setEpisodeMessage("Episode added successfully!");
      setEpisodeTitle("");
      setEpisodeVideoUrl("");
    } catch (err) {
      setEpisodeLoading(false);
      setEpisodeMessage("Error: Could not add episode. " + err.message);
      console.error("Error adding episode: ", err);
    }
  };

  
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* --- Form 1: Create Course --- */}
        <div className="p-6 md:p-8 bg-white rounded-2xl shadow-lg">
          <div className="flex items-center justify-center space-x-2">
            <FiFolderPlus className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Step 1: Create a New Course (Folder)
            </h2>
          </div>

          {message && (
            <p
              className={`p-3 my-4 text-sm text-center rounded-md ${
                message.includes("Error")
                  ? "text-red-800 bg-red-100"
                  : "text-green-800 bg-green-100"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleAddCourse} className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="courseTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Course Title
              </label>
              <input
                id="courseTitle"
                type="text"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="courseDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Course Description
              </label>
              <textarea
                id="courseDescription"
                rows="4"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="courseImageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Course Thumbnail Image URL
              </label>
              <input
                id="courseImageUrl"
                type="url"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                value={courseImageUrl}
                onChange={(e) => setCourseImageUrl(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150"
              >
                {loading ? "Creating..." : "Create Course"}
              </button>
            </div>
          </form>
        </div>

        {/* --- Form 2: Add Episode --- */}
        <div className="p-6 md:p-8 bg-white rounded-2xl shadow-lg">
          <div className="flex items-center justify-center space-x-2">
            <FiFilm className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Step 2: Add an Episode to a Course
            </h2>
          </div>

          {episodeMessage && (
            <p
              className={`p-3 my-4 text-sm text-center rounded-md ${
                episodeMessage.includes("Error")
                  ? "text-red-800 bg-red-100"
                  : "text-green-800 bg-green-100"
              }`}
            >
              {episodeMessage}
            </p>
          )}

          <form onSubmit={handleAddEpisode} className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="courseSelect"
                className="block text-sm font-medium text-gray-700"
              >
                Select Course
              </label>
              <select
                id="courseSelect"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {courses.length === 0 ? (
                  <option value="" disabled>
                    -- Please create a course first --
                  </option>
                ) : (
                  courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label
                htmlFor="episodeTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Episode Title
              </label>
              <input
                id="episodeTitle"
                type="text"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                value={episodeTitle}
                onChange={(e) => setEpisodeTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="episodeVideoUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Episode Video URL (YouTube, etc.)
              </label>
              <input
                id="episodeVideoUrl"
                type="url"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                value={episodeVideoUrl}
                onChange={(e) => setEpisodeVideoUrl(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={episodeLoading || courses.length === 0}
                className="w-full flex justify-center items-center px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition duration-150"
              >
                {episodeLoading ? "Adding..." : "Add Episode"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
