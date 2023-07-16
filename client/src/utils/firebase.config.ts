import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg5LR51no1BwLdBnX0Nf0TD0FfJYO0puQ",
  authDomain: "chatapp-84542.firebaseapp.com",
  projectId: "chatapp-84542",
  storageBucket: "chatapp-84542.appspot.com",
  messagingSenderId: "313696071086",
  appId: "1:313696071086:web:00c546aeb00b6b7386ac3f",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
