import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import {
doc,
getDoc,
collection,
getDocs,
query,
orderBy,
} from "firebase/firestore";
import { FiLoader, FiPlayCircle } from "react-icons/fi"; 


const getEmbedUrl = (url) => {
try {
const urlObj = new URL(url);

if (
    urlObj.hostname === "www.youtube.com" ||
    urlObj.hostname === "youtube.com"
) {
    const videoId = urlObj.searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
}
if (urlObj.hostname === "youtu.be") {
    const videoId = urlObj.pathname.slice(1);
    return `https://www.youtube.com/embed/${videoId}`;
}

return url;
} catch (error) {
console.error("Invalid URL:", error);
return "";
}
};
// --------------------------------------------------

const CourseDetailPage=()=> {
const { courseId } = useParams();
const [course, setCourse] = useState(null);
const [episodes, setEpisodes] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");


const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

useEffect(() => {
const fetchCourseAndEpisodes = async () => {
    setLoading(true);
    setError("");
    try {
    const courseDocRef = doc(db, "courses", courseId);
    const courseDocSnap = await getDoc(courseDocRef);

    if (courseDocSnap.exists()) {
        setCourse({ id: courseDocSnap.id, ...courseDocSnap.data() });

        const episodesCollectionRef = collection(
        db,
        "courses",
        courseId,
        "episodes"
        );
        const q = query(episodesCollectionRef, orderBy("createdAt", "asc"));
        const episodeQuerySnapshot = await getDocs(q);
        const episodesList = episodeQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        setEpisodes(episodesList);


        if (episodesList.length > 0) {
        setSelectedVideoUrl(getEmbedUrl(episodesList[0].videoUrl));
        }
    } else {
        setError("Course not found.");
    }
    } catch (err) {
    console.error("Error fetching course or episodes:", err);
    setError("Failed to load course details. " + err.message);
    } finally {
    setLoading(false);
    }
};

if (courseId) {
    fetchCourseAndEpisodes();
}

}, [courseId]);


const handleEpisodeClick = (videoUrl) => {
setSelectedVideoUrl(getEmbedUrl(videoUrl));
};


if (loading) {
return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <FiLoader className="w-16 h-16 text-indigo-600 animate-spin" />
    </div>
);
}
if (error) {
/* ... */
}
if (!course) {
/* ... */
}


return (
<div className="min-h-screen bg-gray-100">
    {/* We use a 2-column layout on large screens */}
    <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* --- Main Content (Video + Details) --- */}
    <div className="lg:col-span-2">
        {/* <-- 5. مشغل الفيديو --- */}
        {selectedVideoUrl ? (
        <div className="bg-black rounded-lg shadow-lg overflow-hidden mb-8 aspect-video">
            <iframe
            src={selectedVideoUrl}
            title="Course Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            ></iframe>
        </div>
        ) : (
        <div className="bg-gray-200 rounded-lg shadow-lg flex items-center justify-center mb-8 aspect-video">
            <p className="text-gray-500">Select an episode to play.</p>
        </div>
        )}

        {/* Course Header */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {course.title}
        </h1>
        <p className="text-lg text-gray-700">{course.description}</p>
        </div>
    </div>

    {/* --- Sidebar (Episodes List) --- */}
    <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-lg p-6 lg:sticky lg:top-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Episodes</h2>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {episodes.length === 0 && (
            <p className="text-gray-500">No episodes added yet.</p>
            )}


            {episodes.map((ep) => (
            <div
                key={ep.id}
                onClick={() => handleEpisodeClick(ep.videoUrl)}
                className={`p-4 border rounded-md shadow-sm flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                getEmbedUrl(ep.videoUrl) === selectedVideoUrl
                    ? "bg-indigo-100 border-indigo-500 ring-2 ring-indigo-500" 
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
            >
                <FiPlayCircle
                className={`w-5 h-5 ${
                    getEmbedUrl(ep.videoUrl) === selectedVideoUrl
                    ? "text-indigo-600"
                    : "text-gray-400"
                }`}
                />
                <span className="flex-1 font-medium text-gray-800">
                {ep.title}
                </span>
            </div>
            ))}
        </div>
        </div>
    </div>
    </div>
</div>
);
}

export default CourseDetailPage;
