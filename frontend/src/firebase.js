// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi72ADJKLcsEuoJbU2p1NVHfzH5OhqeT8",
  authDomain: "quora-clone-mern-87652.firebaseapp.com",
  projectId: "quora-clone-mern-87652",
  storageBucket: "quora-clone-mern-87652.appspot.com",
  messagingSenderId: "907880110369",
  appId: "1:907880110369:web:a1880e5d37839f8beb8660",
  measurementId: "G-1G28KH5KZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth();
const provider =new GoogleAuthProvider()
// const analytics = getAnalytics(app);


export {auth,provider}