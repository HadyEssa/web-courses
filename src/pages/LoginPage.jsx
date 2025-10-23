import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {auth} from "../config/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email,setEmail ] = useState("");
  const [password,setPassword]= useState("");
  const [error ,setError] = useState("");
  const [loading,setLoading]=useState(false);


  const navigate = useNavigate();

  const handelLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth,email,password)
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError("faild to login check your email and password");
      console.error(error.message);
    }


  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        Login Admin
      </h2>
      {error && (
          <p className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-md">
            {error}
          </p>
        )}
      <form onSubmit={handelLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-md font-medium text-gray-700">
              Email
            </label>
            <input id="email" name="email" type="email" required className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="password" className="block text-md font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" required className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div>
            <button type="submit" disabled={loading} className="w-full px-4 py-2 text-md font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
          </div>
      </form>
      </div>
    </div>
  )
}

export default LoginPage