import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBwIsG-1kHyCZw73F15qIf0o-Mxde5Ti-4",
  authDomain: "pasteleria-f7ed7.firebaseapp.com",
  projectId: "pasteleria-f7ed7",
  storageBucket: "pasteleria-f7ed7.firebasestorage.app",
  messagingSenderId: "668868214704",
  appId: "1:668868214704:web:2737cef6805cc1bacc2075",
  measurementId: "G-KSBQCQ9TVJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
