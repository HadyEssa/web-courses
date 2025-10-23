// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTuDmoy5LQZovi8yh1whuSkZAtNTJS-5M",
  authDomain: "fathy-sh.firebaseapp.com",
  projectId: "fathy-sh",
  storageBucket: "fathy-sh.firebasestorage.app",
  messagingSenderId: "885362983139",
  appId: "1:885362983139:web:c1df60c99d9816447085d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
