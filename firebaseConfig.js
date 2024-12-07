// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // Your Firebase configuration object goes here
  // You can find this in your Firebase project settings
  apiKey: "AIzaSyBmeQCKpeWNUX4yfJ4jFZNu2akSR4yjQZo",
  authDomain: "adva8-2023.firebaseapp.com",
  projectId: "adva8-2023",
  storageBucket: "adva8-2023.appspot.com",
  messagingSenderId: "1035488894149",
  appId: "1:1035488894149:web:605549698d099457ca64ac",
  measurementId: "G-FLL18PQ4Q5",
};

export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const analytics = getAnalytics(app);

export { storage };
