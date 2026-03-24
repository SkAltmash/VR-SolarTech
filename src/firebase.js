import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyChgM0TnvoRMx0ma1TdCuhRjOrFOAsxQn4",
    authDomain: "vrsolortech.firebaseapp.com",
    projectId: "vrsolortech",
    storageBucket: "vrsolortech.firebasestorage.app",
    messagingSenderId: "87518109030",
    appId: "1:87518109030:web:82651e8e498da45256bca7",
    measurementId: "G-533K0SJF2T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
