import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCIEsQ6stVvTAssH56ipQwImsnmVMhPFXE",
    authDomain: "kitchen-canvas-81c76.firebaseapp.com",
    projectId: "kitchen-canvas-81c76",
    storageBucket: "kitchen-canvas-81c76.appspot.com",
    messagingSenderId: "392529922222",
    appId: "1:392529922222:web:8da7a1e376ff7c9875853f"
};

//init firebase
initializeApp(firebaseConfig)

//init firestore
export const db = getFirestore();


