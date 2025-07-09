// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNFjHqclTbXy2yL2vzVEY2QX4JAyX37R0",
  authDomain: "gerep-3eda5.firebaseapp.com",
  projectId: "gerep-3eda5",
  storageBucket: "gerep-3eda5.firebasestorage.app",
  messagingSenderId: "993777816905",
  appId: "1:993777816905:web:395e8c0251ea5f56263698"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
