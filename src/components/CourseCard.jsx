import { Link } from "react-router-dom";


const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/course/${course.id}`}>
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm h-20 overflow-hidden text-ellipsis">
            {course.description}
          </p>
          <div className="text-center mt-4">
            <span className="inline-block bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-full">
              View Course
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CourseCard;
