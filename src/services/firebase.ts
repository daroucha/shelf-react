import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBk79gJ5oB32cjuQD7Bmnso1Dx3UzC8kxI",
  authDomain: "shelf-web-app.firebaseapp.com",
  projectId: "shelf-web-app",
  storageBucket: "shelf-web-app.appspot.com",
  messagingSenderId: "722554166893",
  appId: "1:722554166893:web:bf4a6049450af691702964",
  measurementId: "G-NSD1VYMBZW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;