import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBD2Apyq12KVedQ2Y1HFafEhWbgJ4UC9_c",
  authDomain: "react-beginners-workshop.firebaseapp.com",
  projectId: "react-beginners-workshop",
  storageBucket: "react-beginners-workshop.firebasestorage.app",
  messagingSenderId: "759321913251",
  appId: "1:759321913251:web:f12fc58310cf307e5f1c16",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
