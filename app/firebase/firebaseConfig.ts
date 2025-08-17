// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDd_6SLIXVTZ9z9gx5pLSwzoJXRkZL1rWU",
    authDomain: "shoppinglist-59c36.firebaseapp.com",
    projectId: "shoppinglist-59c36",
    storageBucket: "shoppinglist-59c36.firebasestorage.app",
    messagingSenderId: "369436711984",
    appId: "1:369436711984:web:5d48c9964362a37169e1f5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
