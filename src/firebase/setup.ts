import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBjIxseAZX98IpfVWt320MF_7uZoLJoXmg",
    authDomain: "portfolio-a8baf.firebaseapp.com",
    databaseURL: "https://portfolio-a8baf-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "portfolio-a8baf",
    storageBucket: "portfolio-a8baf.appspot.com",
    messagingSenderId: "139524618633",
    appId: "1:139524618633:web:b00fd93c81fc46346b4958",
};
const databaseURL = "https://portfolio-a8baf-default-rtdb.asia-southeast1.firebasedatabase.app/";

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export default app;
export { database, firebaseConfig, databaseURL };
